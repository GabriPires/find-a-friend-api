-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "independence" INTEGER NOT NULL,
    "environment" INTEGER NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_images" ADD CONSTRAINT "pet_images_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
