/*
  Warnings:

  - Added the required column `adminPassword` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "adminPassword" TEXT NOT NULL,
ALTER COLUMN "adminProfilePicture" DROP NOT NULL;
