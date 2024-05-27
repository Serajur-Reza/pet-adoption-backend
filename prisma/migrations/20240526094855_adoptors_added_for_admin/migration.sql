-- AlterTable
ALTER TABLE "adoptions" ADD COLUMN     "adminId" TEXT;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
