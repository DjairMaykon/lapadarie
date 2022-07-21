-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client" TEXT NOT NULL,
    "amount" INTEGER NOT NULL
);
INSERT INTO "new_order" ("amount", "client", "id") SELECT "amount", "client", "id" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
