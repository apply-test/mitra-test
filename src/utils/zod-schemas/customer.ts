import { z } from "zod";

export const customerSchema = z.object({
  nama: z.string({
    required_error: "Nama harus diisi",
    invalid_type_error: "Nama harus string",
  }),
  telp: z.string({
    required_error: "Telp harus diisi",
    invalid_type_error: "Telp harus string",
  }),
});
