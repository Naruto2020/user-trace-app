/*
  Warnings:

  - You are about to drop the `destination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `travel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `travel` DROP FOREIGN KEY `Travel_destinationId_fkey`;

-- DropForeignKey
ALTER TABLE `travel` DROP FOREIGN KEY `Travel_userId_fkey`;

-- DropTable
DROP TABLE `destination`;

-- DropTable
DROP TABLE `travel`;
