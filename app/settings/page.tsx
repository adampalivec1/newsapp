import { getSources } from "@/lib/db/queries";
import SourceList from "@/components/settings/SourceList";
import AddSourceForm from "@/components/settings/AddSourceForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings – Morning Briefing" };

export default async function SettingsPage() {
  const sources = await getSources();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

      <section className="mb-10">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Newsletter sources
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({sources.length} configured)
          </span>
        </h2>
        <SourceList sources={sources} />
      </section>

      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Add source</h2>
        <AddSourceForm />
      </section>
    </div>
  );
}
