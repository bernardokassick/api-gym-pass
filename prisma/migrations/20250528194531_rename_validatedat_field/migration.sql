/*
  Warnings:

  - You are about to drop the column `valideted_at` on the `checkins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "checkins" DROP COLUMN "valideted_at",
ADD COLUMN     "validated_at" TIMESTAMP(3);
