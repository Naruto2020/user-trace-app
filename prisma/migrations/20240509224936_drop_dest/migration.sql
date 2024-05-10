/*
  Warnings:

  - You are about to drop the `destination` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `travel` DROP FOREIGN KEY `Travel_destinationId_fkey`;

-- DropTable
DROP TABLE `destination`;
