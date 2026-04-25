import type { Story } from "@/lib/ai/types";
import StoryCard from "./StoryCard";

interface Props {
  stories: Story[];
}

export default function TopStoriesSection({ stories }: Props) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-base font-semibold text-gray-900">Must Read</h2>
        <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
          {stories.length} stories
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {stories.map((story) => (
          <StoryCard key={story.headline} story={story} variant="top" />
        ))}
      </div>
    </section>
  );
}
