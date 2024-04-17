-- DropForeignKey
ALTER TABLE "Moth" DROP CONSTRAINT "Moth_collectorId_fkey";

-- AlterTable
ALTER TABLE "Moth" ALTER COLUMN "collectorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Moth" ADD CONSTRAINT "Moth_collectorId_fkey" FOREIGN KEY ("collectorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
