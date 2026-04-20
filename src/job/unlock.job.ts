import cron from "node-cron";
import { prisma } from "../lib/prisma";
// import { emailQueue } from "../queue/email.queue";


export const startUnlockJob = () => {
  // ⏱ runs every minute
  cron.schedule("* * * * *", async () => {
    console.log("⏳ Running unlock job...");
   
    const count=await prisma.message.count()
   if (count === 0) {
        console.log("⚠️ No messages, skipping job...");
        return;
      }
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


