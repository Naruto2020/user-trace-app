/*
  Warnings:

  - You are about to drop the column `status` on the `trip` table. All the data in the column will be lost.
  - You are about to alter the column `departureTime` on the `trip` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(65)`.
  - You are about to alter the column `arrivalTime` on the `trip` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(65)`.
  - You are about to drop the `geolocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `geolocation` DROP FOREIGN KEY `Geolocation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_tripId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- AlterTable
ALTER TABLE `trip` DROP COLUMN `status`,
    MODIFY `departureTime` VARCHAR(65) NOT NULL,
    MODIFY `arrivalTime` VARCHAR(65) NOT NULL;

-- DropTable
DROP TABLE `geolocation`;

-- DropTable
DROP TABLE `notification`;
