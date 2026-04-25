// Phase 3 – AI orchestration (not yet implemented)
// Placeholder exports so imports resolve during Phase 1 UI development.

import type { DigestData, ExtractedStory } from "./types";

export async function extractStoriesFromEmail(
  _emailText: string
): Promise<ExtractedStory[]> {
  throw new Error("Not implemented – Phase 3");
}

export async function aggregateDigest(
  _stories: ExtractedStory[],
  _date: string
): Promise<DigestData> {
  throw new Error("Not implemented – Phase 3");
}
