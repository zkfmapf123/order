/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `shops` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `shops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shops` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `shops_email_key` ON `shops`(`email`);
