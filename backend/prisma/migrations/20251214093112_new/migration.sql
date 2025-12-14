/*
  Warnings:

  - A unique constraint covering the columns `[currentWidgetId]` on the table `App` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeCustomerId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatAnsStatus" AS ENUM ('answered', 'missed');

-- AlterTable
ALTER TABLE "App" ADD COLUMN     "currentWidgetId" TEXT,
ADD COLUMN     "description" TEXT DEFAULT '',
ADD COLUMN     "googleDocName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "GoogleAuthToken" ADD COLUMN     "name" TEXT DEFAULT '',
ADD COLUMN     "picture" TEXT DEFAULT '',
ALTER COLUMN "email" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stripePriceId" TEXT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "stripeCustomerId" TEXT NOT NULL,
ADD COLUMN     "stripeSubscriptionId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateTable
CREATE TABLE "AppWidget" (
    "id" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "agentPhoto" TEXT,
    "headerColor" TEXT NOT NULL,
    "headerTextColor" TEXT NOT NULL,
    "agentMessageColor" TEXT NOT NULL,
    "agentTextColor" TEXT NOT NULL,
    "visitorMessageColor" TEXT NOT NULL,
    "visitorTextColor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appId" TEXT NOT NULL,

    CONSTRAINT "AppWidget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppVisitor" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppVisitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAns" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "status" "ChatAnsStatus" NOT NULL DEFAULT 'missed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatAns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "App_currentWidgetId_key" ON "App"("currentWidgetId");

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_currentWidgetId_fkey" FOREIGN KEY ("currentWidgetId") REFERENCES "AppWidget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppWidget" ADD CONSTRAINT "AppWidget_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppVisitor" ADD CONSTRAINT "AppVisitor_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatAns" ADD CONSTRAINT "ChatAns_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
