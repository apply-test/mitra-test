const takeFirst = (str: string, n: number): string =>
  str.slice(0, n).toUpperCase();

const takeLast = (str: string, n: number): string =>
  str.slice(-n).toUpperCase();

const takeInitials = (str: string): string => {
  return str
    .split(/\s+/)
    .map((word) => word.slice(0, 2))
    .join("")
    .toUpperCase();
};

const randomizer = (length: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generator kode untuk customer
export const customerKodeGenerator = (nama: string, telp: string): string => {
  const namaInitials = takeInitials(nama);
  const telpSuffix = takeLast(telp, 4);
  return `C${namaInitials}${telpSuffix}`.slice(0, 10);
};

// Generator kode untuk barang
export const barangKodeGenerator = (nama: string, harga: number): string => {
  const namaInitials = takeInitials(nama);
  const hargaPrefix = takeFirst(harga.toString(), 2);
  const jumlahAngka =
    harga.toString().length - hargaPrefix.length > 1
      ? harga.toString().length - hargaPrefix.length
      : 0;
  const timestamp = Date.now().toString(16).slice(0, 4);
  return `B${namaInitials}${hargaPrefix}${jumlahAngka}${timestamp}`.slice(
    0,
    10
  );
};

// Generator kode untuk sales
export const salesKodeGenerator = (
  tanggal: Date,
  customerId: number,
  subtotal: number
): string => {
  const dateStr = tanggal.toISOString().slice(2, 10).replace(/-/g, "");
  const customerIdStr = customerId.toString().padStart(4, "0");
  const subtotalStr = takeFirst(subtotal.toString(), 4);
  const timestamp = Date.now().toString(16).slice(0, 4);
  return `S${dateStr}${customerIdStr}${randomizer(2)}${timestamp}`.slice(0, 15);
};
