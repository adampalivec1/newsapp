function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function optional(name: string): string | undefined {
  return process.env[name];
}

export const env = {
  anthropicApiKey: () => required("ANTHROPIC_API_KEY"),
  googleClientId: () => required("GOOGLE_CLIENT_ID"),
  googleClientSecret: () => required("GOOGLE_CLIENT_SECRET"),
  microsoftClientId: () => required("MICROSOFT_CLIENT_ID"),
  microsoftClientSecret: () => required("MICROSOFT_CLIENT_SECRET"),
  microsoftTenantId: () => optional("MICROSOFT_TENANT_ID") ?? "common",
  nextAuthSecret: () => required("NEXTAUTH_SECRET"),
  nextAuthUrl: () => optional("NEXTAUTH_URL") ?? "http://localhost:3000",
  databaseUrl: () => required("DATABASE_URL"),
} as const;
