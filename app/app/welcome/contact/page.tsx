import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { WelcomeContactForm } from "@/components/auth/welcome-contact-form";
import { getCurrentUser } from "@/lib/auth/current-user";

export const metadata = { title: "Contact details" };

export default async function WelcomeContactPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <Logo />
      <h1 className="mt-6 text-3xl font-bold">Your email and active phone number</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        We use these to protect your account and confirm it&apos;s really you.
      </p>
      <WelcomeContactForm email={user.email} phone={user.phone} />
    </main>
  );
}
