/*
  Warnings:

  - You are about to alter the column `status` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `priority` VARCHAR(191) NOT NULL,
    MODIFY `status` BOOLEAN NOT NULL DEFAULT false;
