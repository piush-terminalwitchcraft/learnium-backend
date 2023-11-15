/*
  Warnings:

  - Changed the type of `marks` on the `exams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "exams" ALTER COLUMN "subject" SET NOT NULL,
ALTER COLUMN "subject" SET DATA TYPE TEXT,
DROP COLUMN "marks",
ADD COLUMN     "marks" INTEGER NOT NULL;
