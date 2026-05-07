-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('INVESTOR', 'OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "FundingStatus" AS ENUM ('OPEN', 'FUNDED', 'CLOSED', 'DEFAULTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "email" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'INVESTOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stab" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "description" TEXT,
    "monthlyRevenue" DOUBLE PRECISION NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingPool" (
    "id" TEXT NOT NULL,
    "stabId" TEXT NOT NULL,
    "targetAmount" DOUBLE PRECISION NOT NULL,
    "raisedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "revenueSharePercentage" DOUBLE PRECISION NOT NULL,
    "durationMonths" INTEGER NOT NULL,
    "status" "FundingStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundingPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "id" TEXT NOT NULL,
    "investorId" TEXT NOT NULL,
    "fundingPoolId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "nftMint" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Stab_cnpj_key" ON "Stab"("cnpj");

-- AddForeignKey
ALTER TABLE "Stab" ADD CONSTRAINT "Stab_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingPool" ADD CONSTRAINT "FundingPool_stabId_fkey" FOREIGN KEY ("stabId") REFERENCES "Stab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_fundingPoolId_fkey" FOREIGN KEY ("fundingPoolId") REFERENCES "FundingPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
