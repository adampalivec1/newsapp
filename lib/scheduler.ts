// Phase 4 – Cron scheduler (not yet implemented)
// Run with: npm run cron

import cron from "node-cron";

export function startScheduler(): void {
  // Default: 06:30 every day
  cron.schedule("30 6 * * *", async () => {
    console.log("[scheduler] Starting scheduled digest fetch...");
    // TODO Phase 4: trigger fetch + digest generation
    throw new Error("Not implemented – Phase 4");
  });

  console.log("[scheduler] Cron running – digest scheduled for 06:30 daily");
}

startScheduler();
