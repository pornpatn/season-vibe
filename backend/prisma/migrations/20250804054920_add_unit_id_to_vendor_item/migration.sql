-- AlterTable
ALTER TABLE "InventoryVendorItem" ADD COLUMN     "unitId" TEXT;

-- AddForeignKey
ALTER TABLE "InventoryVendorItem" ADD CONSTRAINT "InventoryVendorItem_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
