"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProducts } from "@/actions/product";
import { toRupiah } from "@/utils/rupiah_format";
import { Product } from "../types/type";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const response = await getProducts();
        setProducts(response);
      } catch (error) {
        console.log("🚀 ~ fetchProducts ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto w-full bg-white shadow-md rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">No</TableHead>
                <TableHead>Kode Barang</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead className="text-right">Harga</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell>{product.kode}</TableCell>
                  <TableCell>{product.nama}</TableCell>
                  <TableCell className="text-right">
                    {toRupiah(product.harga)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
