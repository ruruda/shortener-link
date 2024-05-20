-- CreateTable
CREATE TABLE "Link" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "shortLink" CHAR(6) NOT NULL,
    "longLink" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
