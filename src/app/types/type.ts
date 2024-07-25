export type CustomerType = {
  id: number;
  kode: string;
  nama: string;
  telp: string;
};

export type Product = {
  id: number;
  kode: string;
  nama: string;
  harga: number;
};

export type Detail = {
  id: number;
  sales_id: number;
  barang_id: number;
  harga_bandrol: number;
  qty: number;
  diskon_pct: number;
  diskon_nilai: number;
  harga_diskon: number;
  total: number;
  barang: Product;
};

export type Sales = {
  id: number;
  kode: string;
  tgl: string;
  cust_id: number;
  subtotal: number;
  diskon: number;
  ongkir: number;
  total_bayar: number;
  customer: CustomerType;
  details: Detail[];
};

export type FormData = {
  tgl: Date;
  cust_id: string | null;
  ongkir: number;
  diskon: number;
  details: {
    barang_kode: string | null;
    qty: number;
    diskon_pct: number;
  }[];
};
