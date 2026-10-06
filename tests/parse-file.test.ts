import { describe, expect, it } from "vitest";
import { extractDocxText, extractPdfText } from "@/lib/documents/parse-file";

function minimalPdf(lines: string[]): Buffer {
  const text = lines.map((l) => `(${l}) Tj 0 -16 TD`).join(" ");
  const stream = `BT /F1 12 Tf 20 180 Td ${text} ET`;
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let pdf = "%PDF-1.4\n";
  const off: number[] = [];
  objs.forEach((o, i) => {
    off.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const x = pdf.length;
  pdf +=
    `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` +
    off.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("") +
    `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${x}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

function crc32(b: Buffer): number {
  let c = -1;
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let x = n;
    for (let k = 0; k < 8; k++) x = x & 1 ? 0xedb88320 ^ (x >>> 1) : x >>> 1;
    t[n] = x;
  }
  for (let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 255] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function minimalDocx(text: string): Buffer {
  const files: Record<string, string> = {
    "[Content_Types].xml":
      '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
    "_rels/.rels":
      '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
    "word/document.xml": `<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>${text}</w:t></w:r></w:p></w:body></w:document>`,
  };
  const out: Buffer[] = [];
  const cd: Buffer[] = [];
  let o = 0;
  for (const [n, c] of Object.entries(files)) {
    const d = Buffer.from(c);
    const nb = Buffer.from(n);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4);
    const t = crc32(d);
    lh.writeUInt32LE(t, 14);
    lh.writeUInt32LE(d.length, 18);
    lh.writeUInt32LE(d.length, 22);
    lh.writeUInt16LE(nb.length, 26);
    out.push(lh, nb, d);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0);
    ch.writeUInt16LE(20, 6);
    ch.writeUInt32LE(t, 16);
    ch.writeUInt32LE(d.length, 20);
    ch.writeUInt32LE(d.length, 24);
    ch.writeUInt16LE(nb.length, 28);
    ch.writeUInt32LE(o, 42);
    cd.push(ch, nb);
    o += lh.length + nb.length + d.length;
  }
  const co = o;
  const all = Buffer.concat([...out, ...cd]);
  const ce = Buffer.alloc(22);
  ce.writeUInt32LE(0x06054b50, 0);
  ce.writeUInt16LE(cd.length / 2, 8);
  ce.writeUInt16LE(cd.length / 2, 10);
  ce.writeUInt32LE(all.length - co, 12);
  ce.writeUInt32LE(co, 16);
  return Buffer.concat([all, ce]);
}

describe("local document parsing ($0, no AI)", () => {
  it("extracts text from a PDF", async () => {
    const text = await extractPdfText(minimalPdf(["Esther Okafor", "esther@example.com"]));
    expect(text).toContain("Esther Okafor");
    expect(text).toContain("esther@example.com");
  });

  it("extracts text from a DOCX", async () => {
    const text = await extractDocxText(minimalDocx("Ada Lovelace, ada@test.com"));
    expect(text).toContain("Ada Lovelace");
  });

  it("throws on garbage instead of inventing", async () => {
    await expect(extractPdfText(Buffer.from("not a pdf"))).rejects.toThrow();
    await expect(extractDocxText(Buffer.from("not a docx"))).rejects.toThrow();
  });
});
