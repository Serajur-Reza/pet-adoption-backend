/*
  Warnings:

  - You are about to drop the column `adminId` on the `adoptions` table. All the data in the column will be lost.
  - You are about to drop the column `adoptorId` on the `adoptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adoptions" DROP COLUMN "adminId",
DROP COLUMN "adoptorId";
