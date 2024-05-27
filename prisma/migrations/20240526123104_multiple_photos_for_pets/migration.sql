/*
  Warnings:

  - You are about to drop the column `photo` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "photo",
ADD COLUMN     "photos" TEXT[];
