/*
  Warnings:

  - You are about to drop the column `category` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `documents` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `metatags` on the `articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "category",
DROP COLUMN "documents",
DROP COLUMN "metatags";

-- CreateTable
CREATE TABLE "Category" (
    "categoryID" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryID")
);

-- CreateTable
CREATE TABLE "Metatag" (
    "metatagID" TEXT NOT NULL,
    "metatagName" TEXT NOT NULL,

    CONSTRAINT "Metatag_pkey" PRIMARY KEY ("metatagID")
);

-- CreateTable
CREATE TABLE "Document" (
    "documentID" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "documentPath" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("documentID")
);

-- CreateTable
CREATE TABLE "_ArticleToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleToMetatag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleToDocument" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Metatag_metatagName_key" ON "Metatag"("metatagName");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToCategory_AB_unique" ON "_ArticleToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToCategory_B_index" ON "_ArticleToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToMetatag_AB_unique" ON "_ArticleToMetatag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToMetatag_B_index" ON "_ArticleToMetatag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToDocument_AB_unique" ON "_ArticleToDocument"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToDocument_B_index" ON "_ArticleToDocument"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD CONSTRAINT "_ArticleToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("articleID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD CONSTRAINT "_ArticleToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("categoryID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToMetatag" ADD CONSTRAINT "_ArticleToMetatag_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("articleID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToMetatag" ADD CONSTRAINT "_ArticleToMetatag_B_fkey" FOREIGN KEY ("B") REFERENCES "Metatag"("metatagID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToDocument" ADD CONSTRAINT "_ArticleToDocument_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("articleID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToDocument" ADD CONSTRAINT "_ArticleToDocument_B_fkey" FOREIGN KEY ("B") REFERENCES "Document"("documentID") ON DELETE CASCADE ON UPDATE CASCADE;
