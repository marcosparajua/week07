-- CreateTable
CREATE TABLE "Moth" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "isExtinct" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Moth_pkey" PRIMARY KEY ("id")
);
