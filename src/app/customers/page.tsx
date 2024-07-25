"use client";
import { getCustomers } from "@/actions/customer";
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

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setIsLoading(true);
        const response = await getCustomers();
        setCustomers(response);
      } catch (error) {
        console.log("🚀 ~ fetchCustomers ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCustomers();
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
                <TableHead>Kode Customer</TableHead>
                <TableHead>Nama Customer</TableHead>
                <TableHead>Nomor Telepon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell>{customer.kode}</TableCell>
                  <TableCell>{customer.nama}</TableCell>
                  <TableCell>{customer.telp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
