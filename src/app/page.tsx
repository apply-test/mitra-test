"use client";
import { getAllSales } from "@/actions/transaction";
import { TransactionHeader } from "@/components/transaction_header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toRupiah } from "@/utils/rupiah_format";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sales } from "./types/type";

export default function Home() {
  const [sales, setSales] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function fetchSales() {
      try {
        setIsLoading(true);
        const response = await getAllSales(search, sort);
        const { data, grand_total } = response;
        setSales(data);
        setGrandTotal(grand_total);
      } catch (error) {
        console.log("🚀 ~ fetchSales ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSales();
  }, [search, sort]);

  return (
    <>
      <TransactionHeader
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto w-full bg-white shadow-md rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>No Transaksi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Nama Customer</TableHead>
                <TableHead>Jumlah Barang</TableHead>
                <TableHead>SubTotal</TableHead>
                <TableHead>Diskon</TableHead>
                <TableHead>Ongkir</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale: Sales, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{sale.kode}</TableCell>
                  <TableCell>{sale.tgl}</TableCell>
                  <TableCell>{sale.customer.nama}</TableCell>
                  <TableCell className="text-center">
                    {sale.details.length}
                  </TableCell>
                  <TableCell>{toRupiah(sale.subtotal)}</TableCell>
                  <TableCell className="text-center">
                    {sale.diskon > 0 ? toRupiah(sale.diskon) : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {sale.ongkir > 0 ? toRupiah(sale.ongkir) : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {toRupiah(sale.total_bayar)}
                  </TableCell>
                  <TableCell>
                    <Link href={`/sales/${sale.id}`}>
                      <Button>Detail</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8} className="font-bold text-center">
                  Grand Total
                </TableCell>
                <TableCell className="text-right font-bold">
                  {toRupiah(grandTotal)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </>
  );
}
