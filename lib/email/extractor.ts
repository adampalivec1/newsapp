// Phase 2 – HTML email → clean readable text

export async function extractTextFromHtml(html: string): Promise<string> {
  const { Readability } = await import("@mozilla/readability");
  const { JSDOM } = await import("jsdom");

  const dom = new JSDOM(html, { url: "https://email.local" });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (article?.textContent) {
    return article.textContent.trim();
  }

  // Fallback: strip all HTML tags
  return dom.window.document.body?.textContent?.trim() ?? "";
}
