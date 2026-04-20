import cron from "node-cron";
import { prisma } from "../lib/prisma";


export const startUnlockJob = () => {
  // ⏱ runs every minute
  cron.schedule("* * * * *", async () => {
    console.log("⏳ Running unlock job...");

    const now = new Date();

    const result = await prisma.message.updateMany({
      where: {
        unlockAt: {
          lte: now,
        },
        isUnlocked: false,
      },
      data: {
        isUnlocked: true,
      },
    });

    console.log(`✅ Unlocked ${result.count} messages`);
  });
};