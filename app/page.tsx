import { MOCK_DIGEST } from "@/lib/mockData";
import TopStoriesSection from "@/components/digest/TopStoriesSection";
import CategorySection from "@/components/digest/CategorySection";

export default function HomePage() {
  const { date, topStories, sections } = MOCK_DIGEST;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-1">{date}</p>
        <h1 className="text-2xl font-bold text-gray-900">Morning Briefing</h1>
      </div>

      <div className="flex flex-col gap-10">
        <TopStoriesSection stories={topStories} />

        <div className="border-t border-gray-200" />

        {sections.map((section) => (
          <CategorySection key={section.category} section={section} />
        ))}
      </div>
    </div>
  );
}
