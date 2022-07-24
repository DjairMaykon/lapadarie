/*
  Warnings:

  - Added the required column `amount` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order_item" (
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("orderId", "productId"),
    CONSTRAINT "order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order_item" ("createdAt", "orderId", "productId") SELECT "createdAt", "orderId", "productId" FROM "order_item";
DROP TABLE "order_item";
ALTER TABLE "new_order_item" RENAME TO "order_item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
