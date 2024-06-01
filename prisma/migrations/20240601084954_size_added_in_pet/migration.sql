-- CreateEnum
CREATE TYPE "Size" AS ENUM ('BIG', 'MEDIUM', 'SMALL');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "size" "Size";
