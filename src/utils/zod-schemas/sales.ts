import { z } from "zod";

export const salesSchema = z.object({
  tgl: z.string({
    required_error: "Tanggal harus diisi",
    invalid_type_error: "Tanggal harus string",
  }),
  cust_id: z.number({
    required_error: "Customer harus dipilih",
    invalid_type_error: "Customer ID harus number",
  }),
  details: z.array(
    z.object({
      barang_kode: z.string({
        required_error: "Kode Barang harus diisi",
        invalid_type_error: "Kode Barang harus number",
      }),
      qty: z
        .number({
          required_error: "Quantity harus diisi",
          invalid_type_error: "Quantity harus number",
        })
        .nonnegative(),
      diskon_pct: z
        .number({
          required_error: "Diskon % harus diisi",
          invalid_type_error: "Diskon % harus number",
        })
        .nonnegative(),
    })
  ),
});
