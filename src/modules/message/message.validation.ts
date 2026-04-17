import { z } from "zod";

export const createMessageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  unlockAt: z.string().datetime(),
});