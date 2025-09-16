/*
  Warnings:

  - The `plan` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('free', 'premium');

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "plan",
ADD COLUMN     "plan" "public"."PlanType" NOT NULL DEFAULT 'free';
