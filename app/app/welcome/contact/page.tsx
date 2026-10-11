import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { WelcomeContactForm } from "@/components/auth/welcome-contact-form";
import { getCurrentUser } from "@/lib/auth/current-user";

export const metadata = { title: "Contact details" };

export default async function WelcomeContactPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <main id="main" className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-12">
      <div className="glass-panel p-8">
        <Logo tone="dark" />
        <div className="mt-6 flex items-center gap-2" aria-label="Step 2 of 2">
          <span className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff]" />
          <span className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-[#0875ff] to-[#4338ff]" />
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-white">Your email and active phone number</h1>
        <p className="mt-1 text-sm text-[#b6c8e2]">
          We use these to protect your account and confirm it&apos;s really you.
        </p>
        <WelcomeContactForm email={user.email} phone={user.phone} />
      </div>
    </main>
  );
}
