import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { WelcomeNameForm } from "@/components/auth/welcome-name-form";
import { getCurrentUser } from "@/lib/auth/current-user";

export const metadata = { title: "Welcome" };

export default async function WelcomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <main id="main" className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-12">
      <div className="glass-panel p-8">
        <Logo tone="dark" />
        <div className="mt-6 flex items-center gap-2" aria-label="Step 1 of 2">
          <span className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff]" />
          <span className="h-1.5 flex-1 rounded-full bg-white/15" />
        </div>
        <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-[#00c8ff]">
          SETTING THE STANDARD YOU DESERVE ON A GLOBAL STAGE
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">What&apos;s your full name?</h1>
        <p className="mt-1 text-sm text-[#b6c8e2]">
          This is how your portfolio introduces you to the world.
        </p>
        <WelcomeNameForm initial={user.name} />
      </div>
    </main>
  );
}
