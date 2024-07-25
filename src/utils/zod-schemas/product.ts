import { z } from "zod";

export const productSchema = z.object({
  nama: z.string({
    required_error: "Nama harus diisi",
    invalid_type_error: "Nama harus berupa string",
  }),
  harga: z.number({
    required_error: "Harga harus diisi",
    invalid_type_error: "Harga harus berupa angka",
  }),
});
