/*
  Warnings:

  - Added the required column `userPassword` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userPassword" TEXT NOT NULL,
ALTER COLUMN "userPhoneNo" DROP NOT NULL;
