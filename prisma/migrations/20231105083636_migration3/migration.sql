/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Articles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Batches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BatchesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "_BatchesToUser" DROP CONSTRAINT "_BatchesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BatchesToUser" DROP CONSTRAINT "_BatchesToUser_B_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Articles";

-- DropTable
DROP TABLE "Batches";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_BatchesToUser";

-- CreateTable
CREATE TABLE "admins" (
    "adminID" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "adminEmail" TEXT NOT NULL,
    "adminPassword" TEXT NOT NULL,
    "rootUser" BOOLEAN NOT NULL,
    "adminProfilePicture" TEXT,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("adminID")
);

-- CreateTable
CREATE TABLE "batches" (
    "batchID" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "batchName" TEXT NOT NULL,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("batchID")
);

-- CreateTable
CREATE TABLE "exams" (
    "examID" TEXT NOT NULL,
    "examName" TEXT NOT NULL,
    "subject" TEXT[],
    "marks" TEXT[],
    "examDate" TIMESTAMP(3) NOT NULL,
    "studentID" TEXT NOT NULL,
    "batchID" TEXT NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("examID")
);

-- CreateTable
CREATE TABLE "articles" (
    "articleID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT[],
    "metatags" TEXT[],
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "documents" TEXT[],

    CONSTRAINT "articles_pkey" PRIMARY KEY ("articleID")
);

-- CreateTable
CREATE TABLE "users" (
    "userID" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userProfilePicture" TEXT NOT NULL,
    "userPhoneNo" TEXT NOT NULL,
    "isStudent" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "_BatchToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_adminEmail_key" ON "admins"("adminEmail");

-- CreateIndex
CREATE UNIQUE INDEX "users_userEmail_key" ON "users"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "_BatchToUser_AB_unique" ON "_BatchToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchToUser_B_index" ON "_BatchToUser"("B");

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_batchID_fkey" FOREIGN KEY ("batchID") REFERENCES "batches"("batchID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "admins"("adminID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToUser" ADD CONSTRAINT "_BatchToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "batches"("batchID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToUser" ADD CONSTRAINT "_BatchToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
