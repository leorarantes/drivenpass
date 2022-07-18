-- CreateTable
CREATE TABLE "safenote" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "safenote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "safenote" ADD CONSTRAINT "safenote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
