-- CreateTable
CREATE TABLE "CargoCount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poNumber" TEXT NOT NULL DEFAULT '',
    "startAt" TEXT,
    "endAt" TEXT,
    "count" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "CargoCount_poNumber_key" ON "CargoCount"("poNumber");
