//make function for formatting to rupiah
export const toRupiah = (uang: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(uang);
};
