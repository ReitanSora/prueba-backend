/*
  Warnings:

  - Added the required column `direction` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petPhoto` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "direction" TEXT NOT NULL,
ADD COLUMN     "petPhoto" TEXT NOT NULL;
