/*
  Warnings:

  - You are about to drop the `pet_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pet_images" DROP CONSTRAINT "pet_images_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "pictures" TEXT[],
ALTER COLUMN "about" DROP NOT NULL;

-- DropTable
DROP TABLE "pet_images";
