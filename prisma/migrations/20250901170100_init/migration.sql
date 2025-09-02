/*
  Warnings:

  - A unique constraint covering the columns `[email_id]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `School_email_id_key` ON `School`(`email_id`);
