/*
  Warnings:

  - You are about to drop the `configuracoessistema` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `configuracoessistema`;

-- CreateTable
CREATE TABLE `Configuracoes` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `ldapEnabled` BOOLEAN NOT NULL,
    `ldapServer` VARCHAR(191) NOT NULL,
    `ldapPort` VARCHAR(191) NOT NULL,
    `ldapBaseDN` VARCHAR(191) NOT NULL,
    `apiEnabled` BOOLEAN NOT NULL,
    `apiKey` VARCHAR(191) NOT NULL,
    `backupEnabled` BOOLEAN NOT NULL,
    `backupFrequency` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
