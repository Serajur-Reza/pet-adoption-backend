/*
  Warnings:

  - You are about to drop the column `profilePhoto` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `adoptors` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "profilePhoto";

-- AlterTable
ALTER TABLE "adoptors" DROP COLUMN "profilePhoto";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profilePhoto";
