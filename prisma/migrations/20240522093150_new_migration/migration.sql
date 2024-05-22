/*
  Warnings:

  - You are about to drop the column `petOwnershipExperience` on the `adoptions` table. All the data in the column will be lost.
  - You are about to drop the column `adoptionRequirements` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `medicalHistory` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `temperament` on the `pets` table. All the data in the column will be lost.
  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `health_status` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePhoto` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'Admin', 'User');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "adoptions" DROP COLUMN "petOwnershipExperience";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adoptionRequirements",
DROP COLUMN "medicalHistory",
DROP COLUMN "size",
DROP COLUMN "species",
DROP COLUMN "temperament",
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "health_status" TEXT NOT NULL,
ADD COLUMN     "photos" TEXT[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profilePhoto" TEXT NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "adoptors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adoptors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adoptors_email_key" ON "adoptors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "adoptors" ADD CONSTRAINT "adoptors_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
