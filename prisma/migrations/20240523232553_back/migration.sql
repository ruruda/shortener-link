-- CreateTable
CREATE TABLE "links" (
    "id" STRING NOT NULL,
    "shortLink" CHAR(6) NOT NULL,
    "longLink" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_id_key" ON "links"("id");

-- CreateIndex
CREATE UNIQUE INDEX "links_shortLink_key" ON "links"("shortLink");
