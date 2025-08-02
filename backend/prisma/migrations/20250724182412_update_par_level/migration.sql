/*
  Warnings:

  - You are about to drop the `ParLevel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParLevel" DROP CONSTRAINT "ParLevel_inventoryItemId_fkey";

-- DropTable
DROP TABLE "ParLevel";

-- CreateTable
CREATE TABLE "InventoryParLevel" (
    "id" TEXT NOT NULL,
    "inventoryLocationItemId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InventoryParLevel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryParLevel_inventoryLocationItemId_dayOfWeek_key" ON "InventoryParLevel"("inventoryLocationItemId", "dayOfWeek");

-- AddForeignKey
ALTER TABLE "InventoryParLevel" ADD CONSTRAINT "InventoryParLevel_inventoryLocationItemId_fkey" FOREIGN KEY ("inventoryLocationItemId") REFERENCES "InventoryLocationItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
