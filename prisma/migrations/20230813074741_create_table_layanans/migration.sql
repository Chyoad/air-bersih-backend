-- CreateTable
CREATE TABLE `layanans` (
    `id_layanan` VARCHAR(255) NOT NULL,
    `nama_layanan` VARCHAR(100) NOT NULL,
    `tarif` INTEGER NOT NULL,

    PRIMARY KEY (`id_layanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelanggans` (
    `id_pelanggan` VARCHAR(255) NOT NULL,
    `nama_pelanggan` VARCHAR(100) NOT NULL,
    `id_layanan` VARCHAR(255) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `no_telepon` VARCHAR(20) NOT NULL,
    `meter_awal` INTEGER NOT NULL,

    PRIMARY KEY (`id_pelanggan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pemakaians` (
    `id_pemakaian` VARCHAR(255) NOT NULL,
    `id_pelanggan` VARCHAR(255) NOT NULL,
    `meter_awal` INTEGER NOT NULL,
    `meter_akhir` INTEGER NOT NULL,
    `tarif` INTEGER NOT NULL,
    `tanggal_input` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `inputed_by` VARCHAR(100) NOT NULL,
    `paymaster` VARCHAR(255) NOT NULL,
    `status_pembayaran` VARCHAR(100) NOT NULL,
    `tanggal_bayar` DATETIME(3) NOT NULL,
    `denda` INTEGER NOT NULL,

    PRIMARY KEY (`id_pemakaian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pelanggans` ADD CONSTRAINT `pelanggans_id_layanan_fkey` FOREIGN KEY (`id_layanan`) REFERENCES `layanans`(`id_layanan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pemakaians` ADD CONSTRAINT `pemakaians_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggans`(`id_pelanggan`) ON DELETE RESTRICT ON UPDATE CASCADE;
