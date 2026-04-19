/*
  Warnings:

  - A unique constraint covering the columns `[shareId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "shareId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Message_shareId_key" ON "Message"("shareId");
