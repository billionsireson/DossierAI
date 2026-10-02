import { Spot } from "@/components/motion/spot";
import { Icons } from "@/components/marketing/icons";

const STEPS = [
  { icon: Icons.upload, n: "1", title: "Upload", desc: "Add your CV, resume, project document or take a photo." },
  { icon: Icons.spark, n: "2", title: "AI Builds", desc: "Our AI analyzes your content and creates a stunning portfolio." },
  { icon: Icons.layers, n: "3", title: "Customize", desc: "Edit, tweak and make it yours with our easy editor (Pro/Premium)." },
  { icon: Icons.globe, n: "4", title: "Publish", desc: "Go live with a unique URL and share your portfolio worldwide." },
];

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="relative overflow-hidden bg-[#040b1e] py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-[#2563EB]/15 blur-[120px]" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          How It Works
        </h2>
        <p className="mt-2 text-[#93a4c4]">Get your professional portfolio in 4 simple steps.</p>
        <ol className="relative mt-10 grid gap-4 md:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-[#38bdf8]/50 to-transparent md:block" />
          {STEPS.map((s) => (
            <li key={s.n} className="relative">
              <Spot className="h-full rounded-2xl border border-white/10 bg-[#0a1730]/80 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[#38bdf8]/40 hover:shadow-[0_16px_50px_rgba(37,99,235,0.35)]">
                <span className="relative inline-flex">
                  <span className="absolute inset-0 rounded-2xl bg-[#38bdf8]/30 blur-lg" aria-hidden />
                  <span className="relative rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7c3aed] p-3 text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                </span>
                <p className="mt-4 text-xs font-bold tracking-widest text-[#38bdf8]">{s.n}</p>
                <h3 className="mt-1 font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#93a4c4]">{s.desc}</p>
              </Spot>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
