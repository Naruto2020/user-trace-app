/*
  Warnings:

  - You are about to drop the column `arrivalTime` on the `trip` table. All the data in the column will be lost.
  - You are about to drop the column `departureTime` on the `trip` table. All the data in the column will be lost.
  - Added the required column `arrTime` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depTime` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `trip` DROP COLUMN `arrivalTime`,
    DROP COLUMN `departureTime`,
    ADD COLUMN `arrTime` VARCHAR(65) NOT NULL,
    ADD COLUMN `depTime` VARCHAR(65) NOT NULL;
