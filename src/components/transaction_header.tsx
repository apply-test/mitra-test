import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface TransactionHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

export function TransactionHeader({
  search,
  setSearch,
  sort,
  setSort,
}: TransactionHeaderProps) {
  return (
    <div className="mb-4 flex justify-between items-center">
      <Link href={"/sales/add"}>
        <Button>Tambah Transaksi</Button>
      </Link>
      <div className="flex gap-2">
        <Input
          placeholder="Cari customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Urutkan</SelectLabel>
              <SelectItem value="tgl_asc">Tanggal (Terlama)</SelectItem>
              <SelectItem value="tgl_desc">Tanggal (Terbaru)</SelectItem>
              <SelectItem value="nama_asc">Nama Customer (A-Z)</SelectItem>
              <SelectItem value="nama_desc">Nama Customer (Z-A)</SelectItem>
              <SelectItem value="total_asc">Total (Terendah)</SelectItem>
              <SelectItem value="total_desc">Total (Tertinggi)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
