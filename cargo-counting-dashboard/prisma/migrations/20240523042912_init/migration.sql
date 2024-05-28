-- CreateTable
CREATE TABLE "PoCounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poNumber" TEXT NOT NULL DEFAULT '',
    "startAt" TEXT,
    "endAt" TEXT,
    "count" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "PoCounts_poNumber_key" ON "PoCounts"("poNumber");
