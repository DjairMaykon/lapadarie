-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_inventory_hisstory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inventoryId" INTEGER NOT NULL,
    "entryDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entryAmount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inventory_hisstory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_inventory_hisstory" ("createdAt", "entryAmount", "entryDate", "id", "inventoryId") SELECT "createdAt", "entryAmount", "entryDate", "id", "inventoryId" FROM "inventory_hisstory";
DROP TABLE "inventory_hisstory";
ALTER TABLE "new_inventory_hisstory" RENAME TO "inventory_hisstory";
CREATE TABLE "new_inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_inventory" ("amount", "createdAt", "id", "productId") SELECT "amount", "createdAt", "id", "productId" FROM "inventory";
DROP TABLE "inventory";
ALTER TABLE "new_inventory" RENAME TO "inventory";
CREATE UNIQUE INDEX "inventory_productId_key" ON "inventory"("productId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
