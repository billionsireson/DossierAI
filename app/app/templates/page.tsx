import { TemplateShowcase } from "@/components/marketing/template-showcase";

export const metadata = { title: "Templates" };

export default function TemplatesPage() {
  return (
    <main className="py-2">
      <h1 className="text-2xl font-bold">Templates</h1>
      <p className="mt-1 text-sm text-[#64748B]">
        Four families on one schema. Full switching lands with the renderer
        (Milestone 5).
      </p>
      <div className="-mx-6">
        <TemplateShowcase compact />
      </div>
    </main>
  );
}
