import type { DigestCategory } from "./types";
import { DIGEST_CATEGORIES } from "./types";

export function extractionPrompt(newsletterText: string): string {
  return `You are extracting news stories from a newsletter email.

Extract all distinct news stories from the following newsletter text.
For each story return a JSON object with: headline, summary (2-3 sentences), category, importance (1-5).

Categories must be one of: ${DIGEST_CATEGORIES.map((c) => `"${c}"`).join(", ")}

Respond with a JSON array only. No prose, no markdown fences.

Newsletter text:
${newsletterText}`;
}

export function aggregationPrompt(
  storiesJson: string,
  date: string
): string {
  return `You are producing a morning briefing digest for ${date}.

You have stories extracted from multiple newsletters. Your task:
1. Cluster stories about the same specific event (not just the same topic).
2. For each cluster, merge into one story with combined context and a source attribution list.
3. Only merge if stories cover the same underlying event. When in doubt, keep separate.
4. Note explicitly when sources disagree or provide contradictory information.
5. Add a cross-reference note if a separate but related story exists.
6. Rank all stories by importance and relevance.
7. Separate hard news from opinion/analysis.

Categories (fixed – do not invent new ones): ${DIGEST_CATEGORIES.map((c) => `"${c}"`).join(", ")}

Output a JSON object with this exact shape:
{
  "topStories": [ /* top 3-5 stories, same Story shape */ ],
  "sections": [
    {
      "category": "<one of the fixed categories>",
      "stories": [ /* Story objects */ ]
    }
  ]
}

Story shape:
{
  "headline": string,
  "summary": string,          // richer than any single source; 3-5 sentences
  "category": DigestCategory,
  "importance": 1-5,
  "sources": string[],        // display names of newsletters that covered this
  "crossReference": string    // optional – note related stories
}

Respond with the JSON object only. No prose, no markdown fences.

Stories input:
${storiesJson}`;
}

export const CATEGORY_DESCRIPTIONS: Record<DigestCategory, string> = {
  "EU Politics": "European Union institutions, policy, and Brussels politics",
  "Macro & Markets": "Macroeconomics, financial markets, central banks",
  "Energy & Climate": "Energy markets, climate policy, sustainability",
  "Global Affairs": "International relations, geopolitics, foreign policy",
  "Business & Tech": "Corporate news, technology, startups",
  "Opinion & Analysis": "Editorial opinion and in-depth analysis pieces",
};
