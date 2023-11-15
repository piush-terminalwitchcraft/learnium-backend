/*
  Warnings:

  - You are about to drop the column `marks` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `exams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exams" DROP COLUMN "marks",
DROP COLUMN "subject";

-- CreateTable
CREATE TABLE "subjectScores" (
    "subjectScoreID" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "subjectScore" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "examID" TEXT NOT NULL,

    CONSTRAINT "subjectScores_pkey" PRIMARY KEY ("subjectScoreID")
);

-- AddForeignKey
ALTER TABLE "subjectScores" ADD CONSTRAINT "subjectScores_examID_fkey" FOREIGN KEY ("examID") REFERENCES "exams"("examID") ON DELETE RESTRICT ON UPDATE CASCADE;
