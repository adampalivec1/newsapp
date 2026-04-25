// Phase 2 – Gmail API client (not yet implemented)

export async function fetchGmailEmails(
  _accessToken: string,
  _senderEmail: string,
  _windowHours: number
): Promise<{ subject: string; receivedAt: Date; rawHtml: string }[]> {
  throw new Error("Not implemented – Phase 2");
}
