export interface Story {
  headline: string;
  summary: string;
  category: DigestCategory;
  importance: 1 | 2 | 3 | 4 | 5;
  sources: string[];
  crossReference?: string;
}

export interface DigestSection {
  category: DigestCategory;
  stories: Story[];
}

export interface DigestData {
  topStories: Story[];
  sections: DigestSection[];
  date: string;
}

export type DigestCategory =
  | "EU Politics"
  | "Macro & Markets"
  | "Energy & Climate"
  | "Global Affairs"
  | "Business & Tech"
  | "Opinion & Analysis";

export const DIGEST_CATEGORIES: DigestCategory[] = [
  "EU Politics",
  "Macro & Markets",
  "Energy & Climate",
  "Global Affairs",
  "Business & Tech",
  "Opinion & Analysis",
];

export interface ExtractedStory {
  headline: string;
  summary: string;
  category: DigestCategory;
  importance: 1 | 2 | 3 | 4 | 5;
}
