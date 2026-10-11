import { Spot } from "@/components/motion/spot";
import { Icons } from "@/components/marketing/icons";

const STEPS = [
  { icon: Icons.upload, title: "Upload", desc: "Add your CV, resume, project document or take a photo." },
  { icon: Icons.spark, title: "AI Builds", desc: "Our AI analyzes your content and creates a stunning portfolio." },
  { icon: Icons.layers, title: "Customize", desc: "Edit, tweak and make it yours with our easy editor (Pro/Premium)." },
  { icon: Icons.globe, title: "Publish", desc: "Go live with a unique URL and share your portfolio worldwide." },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-[#020914]"
      style={{ backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(0,76,190,0.1), transparent 55%)" }}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 id="how-heading" className="text-3xl font-semibold tracking-tight text-[#f4f8ff] md:text-[2.5rem] md:leading-[1.15]">
            From files to a global-ready portfolio
          </h2>
          <p className="mt-3 leading-[1.65] text-[#b6c8e2]">
            Drop in what you already have. DossierAI structures it, designs it,
            and hands you a portfolio you&apos;re proud to share — in minutes.
          </p>
          <ol className="mt-8 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-[#f4f8ff]">{s.title}</p>
                  <p className="text-sm text-[#7892b5]">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-6" aria-hidden>
          <div className="relative aspect-[0.85] rounded-xl border border-[rgba(73,147,255,0.14)] bg-[#071a33] shadow-[0_16px_48px_rgba(0,0,0,0.28)]">
            <div className="absolute inset-[8%] rotate-[-9deg] rounded-lg bg-gradient-to-br from-[#f7fbff] to-[#c7dcf7] shadow-[0_8px_24px_rgba(0,0,0,0.15)]" />
            <div className="absolute inset-[8%] rotate-[6deg] rounded-lg bg-gradient-to-br from-[#eef4fd] to-[#b7cce3] shadow-[0_8px_24px_rgba(0,0,0,0.15)]" />
            <div className="absolute inset-[8%] rounded-lg bg-gradient-to-br from-[#f7fbff] to-[#c7dcf7] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              <div className="h-1.5 w-2/3 rounded bg-[#0865ff]/70" />
              <div className="mt-1.5 space-y-1">
                <div className="h-1 rounded bg-[#7892b5]/50" />
                <div className="h-1 w-4/5 rounded bg-[#7892b5]/50" />
                <div className="h-1 w-3/5 rounded bg-[#7892b5]/50" />
              </div>
            </div>
          </div>
          <Icons.arrow className="mx-auto h-8 w-8 rotate-90 text-[#00c8ff] drop-shadow-[0_0_10px_rgba(0,200,255,0.6)] sm:rotate-0" />
          <Spot className="rounded-[18px] border border-[rgba(0,174,255,0.65)] bg-[linear-gradient(145deg,rgba(13,47,86,0.8),rgba(3,15,32,0.88))] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.28),0_0_30px_rgba(0,102,255,0.2)] backdrop-blur-[18px]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#00c8ff]">Your portfolio</p>
            <div className="mt-3 h-16 rounded-lg bg-gradient-to-br from-[#0644db] to-[#00c8ff]" />
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-3/4 rounded bg-white/80" />
              <div className="h-1.5 w-1/2 rounded bg-white/50" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <div className="h-10 rounded-md bg-gradient-to-br from-[#0875ff] to-[#4338ff]" />
              <div className="h-10 rounded-md bg-gradient-to-br from-[#00c8ff] to-[#0875ff]" />
              <div className="h-10 rounded-md bg-gradient-to-br from-[#4338ff] to-[#00c8ff]" />
            </div>
          </Spot>
        </div>
      </div>
    </section>
  );
}
