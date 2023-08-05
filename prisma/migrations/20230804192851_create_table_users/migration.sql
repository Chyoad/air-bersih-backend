-- CreateTable
CREATE TABLE `users` (
    `id_user` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `no_telepon` VARCHAR(20) NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `level` INTEGER NULL,
    `alamat` VARCHAR(255) NULL,
    `token` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
