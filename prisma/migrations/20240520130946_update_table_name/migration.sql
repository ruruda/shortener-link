/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Link";

-- CreateTable
CREATE TABLE "links" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "shortLink" CHAR(6) NOT NULL,
    "longLink" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);
