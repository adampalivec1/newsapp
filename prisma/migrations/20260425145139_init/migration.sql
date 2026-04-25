-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL,
    "accountEmail" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "fetchWindowHours" INTEGER NOT NULL DEFAULT 20,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FetchedEmail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "receivedAt" DATETIME NOT NULL,
    "rawHtml" TEXT NOT NULL,
    "extractedText" TEXT NOT NULL,
    "processedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FetchedEmail_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Digest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sections" TEXT NOT NULL,
    "topStories" TEXT NOT NULL,
    "rawSources" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'generating'
);

-- CreateTable
CREATE TABLE "SavedStory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "digestId" TEXT NOT NULL,
    "storySnapshot" TEXT NOT NULL,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" DATETIME,
    "tags" TEXT NOT NULL,
    CONSTRAINT "SavedStory_digestId_fkey" FOREIGN KEY ("digestId") REFERENCES "Digest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
