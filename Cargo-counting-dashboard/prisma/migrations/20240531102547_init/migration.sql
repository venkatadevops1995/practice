-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CargoCount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poNumber" TEXT NOT NULL,
    "startAt" TEXT,
    "endAt" TEXT,
    "count" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_CargoCount" ("count", "endAt", "id", "isActive", "poNumber", "startAt") SELECT "count", "endAt", "id", "isActive", "poNumber", "startAt" FROM "CargoCount";
DROP TABLE "CargoCount";
ALTER TABLE "new_CargoCount" RENAME TO "CargoCount";
CREATE UNIQUE INDEX "CargoCount_poNumber_key" ON "CargoCount"("poNumber");
PRAGMA foreign_key_check("CargoCount");
PRAGMA foreign_keys=ON;
