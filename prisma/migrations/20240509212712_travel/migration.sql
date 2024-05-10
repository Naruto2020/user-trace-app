/*
  Warnings:

  - You are about to drop the `trip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `trip` DROP FOREIGN KEY `Trip_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `trip` DROP FOREIGN KEY `Trip_userId_fkey`;

-- DropTable
DROP TABLE `trip`;

-- CreateTable
CREATE TABLE `Travel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departureTime` VARCHAR(65) NOT NULL,
    `arrivalTime` VARCHAR(65) NOT NULL,
    `userId` INTEGER NOT NULL,
    `destinationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Travel` ADD CONSTRAINT `Travel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Travel` ADD CONSTRAINT `Travel_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
