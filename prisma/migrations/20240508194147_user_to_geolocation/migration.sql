/*
  Warnings:

  - You are about to drop the column `createdAt` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `trip` table. All the data in the column will be lost.
  - Added the required column `tripId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `tripId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trip` DROP COLUMN `createdAt`,
    DROP COLUMN `status`,
    ADD COLUMN `destinationId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Destination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `destination` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Geolocation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `Trip_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Geolocation` ADD CONSTRAINT `Geolocation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `Trip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
