import type { Story } from "@/lib/ai/types";

interface Props {
  story: Story;
  variant?: "top" | "standard";
}

export default function StoryCard({ story, variant = "standard" }: Props) {
  const isTop = variant === "top";

  return (
    <article
      className={`bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3 ${
        isTop
          ? "border-l-4 border-l-amber-400 border border-gray-200"
          : "border border-gray-200"
      }`}
    >
      <div>
        <h3
          className={`font-semibold text-gray-900 leading-snug ${
            isTop ? "text-base" : "text-sm"
          }`}
        >
          {story.headline}
        </h3>
        <p className="mt-2 text-sm text-gray-700 leading-relaxed">{story.summary}</p>
        {story.crossReference && (
          <p className="mt-2 text-xs text-gray-400 italic">↗ {story.crossReference}</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100">
        <div className="flex gap-1.5 flex-wrap">
          {story.sources.map((source) => (
            <span
              key={source}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap"
            >
              {source}
            </span>
          ))}
        </div>
        <button
          disabled
          title="Save for later – coming in Phase 3"
          aria-label="Save for later"
          className="text-gray-300 text-base shrink-0 cursor-default"
        >
          ☆
        </button>
      </div>
    </article>
  );
}
