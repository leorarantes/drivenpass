/*
  Warnings:

  - You are about to drop the `safenote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "safenote" DROP CONSTRAINT "safenote_userId_fkey";

-- DropTable
DROP TABLE "safenote";

-- CreateTable
CREATE TABLE "safenotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "safenotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "safenotes" ADD CONSTRAINT "safenotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
