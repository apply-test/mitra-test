-- CreateTable
CREATE TABLE "m_barang" (
    "id" SERIAL NOT NULL,
    "kode" VARCHAR(10) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "harga" INTEGER NOT NULL,

    CONSTRAINT "m_barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "m_customer" (
    "id" SERIAL NOT NULL,
    "kode" VARCHAR(10) NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "telp" VARCHAR(20) NOT NULL,

    CONSTRAINT "m_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_sales" (
    "id" SERIAL NOT NULL,
    "kode" VARCHAR(15) NOT NULL,
    "tgl" TIMESTAMP(3) NOT NULL,
    "cust_id" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "diskon" INTEGER NOT NULL,
    "ongkir" INTEGER NOT NULL,
    "total_bayar" INTEGER NOT NULL,

    CONSTRAINT "t_sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_sales_det" (
    "id" SERIAL NOT NULL,
    "sales_id" INTEGER NOT NULL,
    "barang_id" INTEGER NOT NULL,
    "harga_bandrol" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "diskon_pct" INTEGER NOT NULL,
    "diskon_nilai" INTEGER NOT NULL,
    "harga_diskon" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "t_sales_det_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_barang_kode_key" ON "m_barang"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "m_customer_kode_key" ON "m_customer"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "t_sales_kode_key" ON "t_sales"("kode");

-- AddForeignKey
ALTER TABLE "t_sales" ADD CONSTRAINT "t_sales_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "m_customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_sales_det" ADD CONSTRAINT "t_sales_det_sales_id_fkey" FOREIGN KEY ("sales_id") REFERENCES "t_sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "t_sales_det" ADD CONSTRAINT "t_sales_det_barang_id_fkey" FOREIGN KEY ("barang_id") REFERENCES "m_barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
