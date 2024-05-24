/*
  Warnings:

  - Added the required column `username` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `adoptors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "adoptors" ADD COLUMN     "username" TEXT NOT NULL;
