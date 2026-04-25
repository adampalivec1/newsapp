// Phase 2 – Microsoft Graph client (not yet implemented)

export async function fetchOutlookEmails(
  _accessToken: string,
  _senderEmail: string,
  _windowHours: number
): Promise<{ subject: string; receivedAt: Date; rawHtml: string }[]> {
  throw new Error("Not implemented – Phase 2");
}
