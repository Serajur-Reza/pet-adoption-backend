/*
  Warnings:

  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `adoptors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_email_fkey";

-- DropForeignKey
ALTER TABLE "adoptions" DROP CONSTRAINT "adoptions_adminId_fkey";

-- DropForeignKey
ALTER TABLE "adoptions" DROP CONSTRAINT "adoptions_adoptorId_fkey";

-- DropForeignKey
ALTER TABLE "adoptors" DROP CONSTRAINT "adoptors_email_fkey";

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "adoptors";
