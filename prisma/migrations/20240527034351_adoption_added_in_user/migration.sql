-- DropForeignKey
ALTER TABLE "adoptions" DROP CONSTRAINT "adoptions_userId_fkey";

-- AlterTable
ALTER TABLE "adoptions" ADD COLUMN     "adoptorId" TEXT;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_adoptorId_fkey" FOREIGN KEY ("adoptorId") REFERENCES "adoptors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
