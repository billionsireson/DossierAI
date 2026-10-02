import { demoUser } from "@/lib/demo";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <main className="py-2">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 text-sm">
        <p><span className="text-[#64748B]">Name:</span> {demoUser.name}</p>
        <p className="mt-1"><span className="text-[#64748B]">Email:</span> {demoUser.email}</p>
        <p className="mt-1"><span className="text-[#64748B]">Plan:</span> {demoUser.plan}</p>
        <p className="mt-3 text-[#64748B]">
          Account management, visibility controls and data export land with auth
          + publishing.
        </p>
      </div>
    </main>
  );
}
