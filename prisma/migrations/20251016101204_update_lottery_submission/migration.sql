-- CreateTable
CREATE TABLE "LotterySubmission" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL DEFAULT LPAD((FLOOR(RANDOM() * 999999))::text, 6, '0'),
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "accepted_terms" BOOLEAN NOT NULL,
    "accepted_privacy" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LotterySubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LotterySubmission_uniqueId_key" ON "LotterySubmission"("uniqueId");
