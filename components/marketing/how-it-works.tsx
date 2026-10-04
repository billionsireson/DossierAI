import { Icons } from "@/components/marketing/icons";

const STEPS = [
  { icon: Icons.photo, n: "1", title: "Upload", desc: "Add your CV, resume, project document or take a photo." },
  { icon: Icons.spark, n: "2", title: "AI Builds", desc: "Our AI analyzes your content and creates a stunning portfolio." },
  { icon: Icons.layers, n: "3", title: "Customize", desc: "Edit, tweak and make it yours with our easy editor (Pro/Premium)." },
  { icon: Icons.globe, n: "4", title: "Publish", desc: "Go live with a unique URL and share your portfolio worldwide." },
];

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
          How It Works
        </h2>
        <p className="mt-2 text-[#64748B]">Get your professional portfolio in 4 simple steps.</p>
        <ol className="relative mt-10 space-y-0">
          <div aria-hidden className="absolute bottom-6 left-[27px] top-6 hidden w-px bg-gradient-to-b from-[#2E7CF6]/50 via-[#B7CCE3] to-transparent md:block" />
          {STEPS.map((s) => (
            <li key={s.n} className="relative flex gap-5 pb-8 last:pb-0">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2E7CF6] to-[#180F6E] text-white shadow-[0_8px_24px_rgba(46,124,246,0.4)]">
                <s.icon className="h-6 w-6" />
                <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0F172A] text-[11px] font-bold text-white">
                  {s.n}
                </span>
              </span>
              <div className="pt-1">
                <h3 className="font-semibold text-[#0F172A]">{s.title}</h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#64748B]">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
