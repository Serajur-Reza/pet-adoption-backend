-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "special_needs" TEXT,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "isActivated" SET DEFAULT true;
