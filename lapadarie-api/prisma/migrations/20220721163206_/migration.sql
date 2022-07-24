/*
  Warnings:

  - You are about to drop the column `amount` on the `order` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "order_item" (
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("orderId", "productId"),
    CONSTRAINT "order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client" TEXT NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "canceled" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_order" ("client", "createdAt", "delivered", "id") SELECT "client", "createdAt", "delivered", "id" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
