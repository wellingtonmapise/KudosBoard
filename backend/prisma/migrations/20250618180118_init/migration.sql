/*
  Warnings:

  - You are about to drop the column `description` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "description",
ALTER COLUMN "gif" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;
