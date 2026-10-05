import { getCurrentUser } from "@/lib/auth/current-user";
import { demoUser } from "@/lib/demo";
import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { DeleteAccountForm } from "@/components/auth/delete-account-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await getCurrentUser();
  return (
    <main className="py-2">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm">
        <h2 className="font-semibold">Profile</h2>
        <p className="mt-2"><span className="text-[#64748B]">Name:</span> {user?.name ?? demoUser.name}</p>
        <p className="mt-1"><span className="text-[#64748B]">Email:</span> {user?.email ?? demoUser.email}</p>
        <p className="mt-1"><span className="text-[#64748B]">Plan:</span> {user?.plan ?? demoUser.plan}</p>
        {!user && (
          <p className="mt-2 text-xs text-[#94a3b8]">Signed out — showing sample identity.</p>
        )}
      </div>
      {user && (
        <div className="mt-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm">
          <h2 className="font-semibold">Password</h2>
          <ChangePasswordForm />
        </div>
      )}
      {user && (
        <div className="mt-4 rounded-2xl border border-[#fecaca] bg-white p-6 text-sm">
          <h2 className="font-semibold text-[#b91c1c]">Danger zone</h2>
          <DeleteAccountForm />
        </div>
      )}
    </main>
  );
}
