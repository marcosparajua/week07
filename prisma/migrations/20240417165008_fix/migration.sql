/*
  Warnings:

  - Added the required column `collectorId` to the `Moth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Moth" ADD COLUMN     "collectorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Moth" ADD CONSTRAINT "Moth_collectorId_fkey" FOREIGN KEY ("collectorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
