/*
  Warnings:

  - You are about to drop the `trip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `trip` DROP FOREIGN KEY `Trip_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `trip` DROP FOREIGN KEY `Trip_userId_fkey`;

-- AlterTable
ALTER TABLE `destination` MODIFY `destination` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `trip`;
