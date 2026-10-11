import { getCurrentUser } from "@/lib/auth/current-user";
import { demoUser } from "@/lib/demo";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { DeleteAccountForm } from "@/components/auth/delete-account-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await getCurrentUser();
  return (
    <main id="main" className="py-2">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>
      <div className="glass-panel mt-5 p-6 text-sm text-white">
        <h2 className="font-semibold">Profile</h2>
        <p className="mt-2"><span className="text-[#7892b5]">Name:</span> {user?.name ?? demoUser.name}</p>
        <p className="mt-1"><span className="text-[#7892b5]">Email:</span> {user?.email ?? demoUser.email}</p>
        <p className="mt-1"><span className="text-[#7892b5]">Plan:</span> {user?.plan ?? demoUser.plan}</p>
        {!user && (
          <p className="mt-2 text-xs text-[#7892b5]">Signed out — showing sample identity.</p>
        )}
      </div>
      {user && (
        <div className="glass-panel mt-4 p-6 text-sm text-white">
          <h2 className="font-semibold">Password</h2>
          <ChangePasswordForm />
        </div>
      )}
      {user && (
        <div className="mt-4 rounded-[18px] border border-red-500/40 bg-[rgba(5,24,49,0.78)] p-6 text-sm text-white">
          <h2 className="font-semibold text-red-300">Danger zone</h2>
          <DeleteAccountForm />
        </div>
      )}
    </main>
  );
}
