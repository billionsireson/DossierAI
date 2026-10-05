import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { isDbConfigured } from "@/lib/env";
import { getDb } from "@/lib/db";

// Serverless-safe document bytes: Postgres when configured (works on
// Netlify/Vercel), local .uploads/ mirror otherwise.

export async function saveDocument(args: {
  userId: string;
  fileName: string;
  mimeType: string;
  data: Buffer;
}): Promise<{ documentId: string | null; storageKey: string; sizeBytes: number }> {
  const safe = args.fileName.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
  const storageKey = `${randomUUID()}-${safe}`;
  if (!isDbConfigured()) {
    const dir = path.join(process.cwd(), ".uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, storageKey), args.data);
    return { documentId: null, storageKey, sizeBytes: args.data.length };
  }
  const db = await getDb();
  const doc = await db.sourceDocument.create({
    data: {
      userId: args.userId,
      fileName: args.fileName,
      mimeType: args.mimeType,
      sizeBytes: args.data.length,
      storageKey,
      data: args.data,
    },
  });
  return { documentId: doc.id, storageKey, sizeBytes: args.data.length };
}

export async function readDocumentBytes(storageKey: string): Promise<Buffer | null> {
  const base = path.basename(storageKey);
  if (base !== storageKey || storageKey.includes("..")) return null;
  if (isDbConfigured()) {
    try {
      const db = await getDb();
      const doc = await db.sourceDocument.findFirst({ where: { storageKey } });
      if (doc?.data) return Buffer.from(doc.data);
    } catch {
      // Fall through to local mirror.
    }
  }
  try {
    return await readFile(path.join(process.cwd(), ".uploads", base));
  } catch {
    return null;
  }
}
