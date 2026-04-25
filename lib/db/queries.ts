// All database access goes through this module. No raw Prisma calls elsewhere.

import { PrismaClient } from "@/app/generated/prisma/client";
import type {
  Source,
  FetchedEmail,
  Digest,
  SavedStory,
  Prisma,
} from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

function createPrismaClient(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL ?? "file:./dev.db";
  const dbPath = dbUrl.replace(/^file:/, "");
  const absolutePath = path.isAbsolute(dbPath)
    ? dbPath
    : path.join(process.cwd(), dbPath);
  const adapter = new PrismaBetterSqlite3({ url: absolutePath });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ── Sources ──────────────────────────────────────────────────────────────────

export function getSources(): Promise<Source[]> {
  return prisma.source.findMany({ orderBy: { createdAt: "asc" } });
}

export function getActiveSources(): Promise<Source[]> {
  return prisma.source.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });
}

export function createSource(
  data: Prisma.SourceCreateInput
): Promise<Source> {
  return prisma.source.create({ data });
}

export function updateSource(
  id: string,
  data: Prisma.SourceUpdateInput
): Promise<Source> {
  return prisma.source.update({ where: { id }, data });
}

export function deleteSource(id: string): Promise<Source> {
  return prisma.source.delete({ where: { id } });
}

// ── FetchedEmails ─────────────────────────────────────────────────────────────

export function getEmailsBySource(sourceId: string): Promise<FetchedEmail[]> {
  return prisma.fetchedEmail.findMany({
    where: { sourceId },
    orderBy: { receivedAt: "desc" },
  });
}

export function getUnprocessedEmails(): Promise<FetchedEmail[]> {
  return prisma.fetchedEmail.findMany({
    where: { processedAt: null },
    orderBy: { receivedAt: "asc" },
  });
}

export function upsertFetchedEmail(
  data: Prisma.FetchedEmailCreateInput
): Promise<FetchedEmail> {
  return prisma.fetchedEmail.create({ data });
}

export function markEmailProcessed(id: string): Promise<FetchedEmail> {
  return prisma.fetchedEmail.update({
    where: { id },
    data: { processedAt: new Date() },
  });
}

// ── Digests ───────────────────────────────────────────────────────────────────

export function getDigests(): Promise<Digest[]> {
  return prisma.digest.findMany({ orderBy: { date: "desc" } });
}

export function getLatestDigest(): Promise<Digest | null> {
  return prisma.digest.findFirst({ orderBy: { date: "desc" } });
}

export function getDigestById(id: string): Promise<Digest | null> {
  return prisma.digest.findUnique({ where: { id } });
}

export function createDigest(
  data: Prisma.DigestCreateInput
): Promise<Digest> {
  return prisma.digest.create({ data });
}

export function updateDigestStatus(
  id: string,
  status: string
): Promise<Digest> {
  return prisma.digest.update({ where: { id }, data: { status } });
}

// ── SavedStories ──────────────────────────────────────────────────────────────

export function getSavedStories(): Promise<(SavedStory & { digest: Digest })[]> {
  return prisma.savedStory.findMany({
    include: { digest: true },
    orderBy: { savedAt: "desc" },
  });
}

export function saveStory(
  data: Prisma.SavedStoryCreateInput
): Promise<SavedStory> {
  return prisma.savedStory.create({ data });
}

export function markStoryRead(id: string): Promise<SavedStory> {
  return prisma.savedStory.update({
    where: { id },
    data: { readAt: new Date() },
  });
}

export function deleteSavedStory(id: string): Promise<SavedStory> {
  return prisma.savedStory.delete({ where: { id } });
}

export type { Source, FetchedEmail, Digest, SavedStory, Prisma };
