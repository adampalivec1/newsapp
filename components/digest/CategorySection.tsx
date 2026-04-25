import type { DigestSection } from "@/lib/ai/types";
import StoryCard from "./StoryCard";

interface Props {
  section: DigestSection;
}

export default function CategorySection({ section }: Props) {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        {section.category}
      </h2>
      <div className="flex flex-col gap-3">
        {section.stories.map((story) => (
          <StoryCard key={story.headline} story={story} variant="standard" />
        ))}
      </div>
    </section>
  );
}
