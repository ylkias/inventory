-- DropIndex
DROP INDEX `Usuario_usuario_key` ON `usuario`;

-- CreateTable
CREATE TABLE `ConfiguracoesSistema` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `ldapEnabled` BOOLEAN NOT NULL DEFAULT false,
    `ldapServer` VARCHAR(191) NULL DEFAULT '',
    `ldapPort` VARCHAR(191) NULL DEFAULT '389',
    `ldapBaseDN` VARCHAR(191) NULL DEFAULT '',
    `apiEnabled` BOOLEAN NOT NULL DEFAULT false,
    `apiKey` VARCHAR(191) NULL DEFAULT '',
    `backupEnabled` BOOLEAN NOT NULL DEFAULT false,
    `backupFrequency` VARCHAR(191) NULL DEFAULT 'daily',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
