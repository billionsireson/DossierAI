import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { WelcomeNameForm } from "@/components/auth/welcome-name-form";
import { getCurrentUser } from "@/lib/auth/current-user";

export const metadata = { title: "Welcome" };

export default async function WelcomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <Logo />
      <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-[#2E7CF6]">
        SETTING THE STANDARD YOU DESERVE ON A GLOBAL STAGE
      </p>
      <h1 className="mt-2 text-3xl font-bold">What&apos;s your full name?</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        This is how your portfolio introduces you to the world.
      </p>
      <WelcomeNameForm initial={user.name} />
    </main>
  );
}
