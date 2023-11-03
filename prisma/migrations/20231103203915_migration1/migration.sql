-- CreateTable
CREATE TABLE "Admin" (
    "adminID" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "adminEmail" TEXT NOT NULL,
    "rootUser" BOOLEAN NOT NULL,
    "adminProfilePicture" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminID")
);

-- CreateTable
CREATE TABLE "Batches" (
    "batchID" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "batchName" TEXT NOT NULL,

    CONSTRAINT "Batches_pkey" PRIMARY KEY ("batchID")
);

-- CreateTable
CREATE TABLE "Articles" (
    "articleID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT[],
    "metatags" TEXT[],
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "documents" TEXT[],

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("articleID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userProfilePicture" TEXT NOT NULL,
    "userPhoneNo" TEXT NOT NULL,
    "isStudent" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "_BatchesToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BatchesToUser_AB_unique" ON "_BatchesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchesToUser_B_index" ON "_BatchesToUser"("B");

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin"("adminID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchesToUser" ADD CONSTRAINT "_BatchesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Batches"("batchID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchesToUser" ADD CONSTRAINT "_BatchesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
