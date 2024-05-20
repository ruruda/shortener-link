/*
  Warnings:

  - You are about to alter the column `id` on the `links` table. The data in that column will be cast from `Int` to `String`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_links" (
    "id" STRING NOT NULL,
    "shortLink" CHAR(6) NOT NULL,
    "longLink" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_links" ("createdAt","id","longLink","shortLink","updatedAt") SELECT "createdAt","id","longLink","shortLink","updatedAt" FROM "links";
DROP TABLE "links" CASCADE;
ALTER TABLE "_prisma_new_links" RENAME TO "links";
CREATE UNIQUE INDEX "links_id_key" ON "links"("id");
CREATE UNIQUE INDEX "links_shortLink_key" ON "links"("shortLink");
