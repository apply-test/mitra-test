"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
import { getCustomerByCode, getCustomers } from "@/actions/customer";
import { getProducts } from "@/actions/product";
import { DatePicker } from "@/components/date_picker";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { toRupiah } from "@/utils/rupiah_format";
import { addTransaction } from "@/actions/transaction";
import Link from "next/link";
import { CustomerType, FormData, Product } from "@/app/types/type";

export default function AddTransaction() {
  const [formData, setFormData] = useState<FormData>({
    tgl: new Date(),
    cust_id: null,
    ongkir: 0,
    diskon: 0,
    details: [{ barang_kode: null, qty: 1, diskon_pct: 0 }],
  });
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cust = await getCustomers();
        setCustomers(cust);

        const prod = await getProducts();
        setProducts(prod);
      } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleDetailChange = (
    index: number,
    field: keyof FormData["details"][0],
    value: string
  ) => {
    const newDetails = formData.details.map((detail, i) =>
      i === index
        ? {
            ...detail,
            [field]:
              field === "qty" || field === "diskon_pct" ? Number(value) : value,
          }
        : detail
    );
    setFormData((prev) => ({
      ...prev,
      details: newDetails,
    }));
  };

  const addProductDetail = () => {
    setFormData((prev) => ({
      ...prev,
      details: [...prev.details, { barang_kode: null, qty: 1, diskon_pct: 0 }],
    }));
  };

  const handleRemoveDetail = (index: number) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      details: newDetails,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedDetails = formData.details.map((detail) => ({
      ...detail,
      qty: detail.qty,
      diskon_pct: detail.diskon_pct,
    }));

    const updatedFormData = {
      ...formData,
      details: updatedDetails,
    };

    await addTransaction(updatedFormData);
  };

  const calculateTotals = () => {
    let subTotal = 0;

    formData.details.forEach((detail) => {
      const product = products.find((p) => p.kode === detail.barang_kode);
      if (product) {
        const hargaBandrol = product.harga;
        const hargaDiskon =
          hargaBandrol - (hargaBandrol * detail.diskon_pct) / 100;
        subTotal += hargaDiskon * detail.qty;
      }
    });

    const totalBayar = subTotal - formData.diskon + formData.ongkir;

    return {
      subTotal,
      totalBayar,
    };
  };

  const { subTotal, totalBayar } = calculateTotals();

  const handleCustomerChange = async (value: string) => {
    const cust = await getCustomerByCode(value);
    setFormData((prev) => ({
      ...prev,
      cust_id: cust.id,
    }));
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Transaction</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="tgl">Date</label>
          <div className="col-span-3">
            <DatePicker
              selected={formData.tgl}
              onChange={(date: Date) => setFormData({ ...formData, tgl: date })}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="cust_id">Customer</label>
          <div className="col-span-3 flex items-center">
            <Select onValueChange={handleCustomerChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pilih User</SelectLabel>
                  {customers?.map((customer) => (
                    <SelectItem value={customer.kode} key={customer.id}>
                      {`${customer.kode} - ${customer.nama}`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="ongkir">Shipping Cost</label>
          <Input
            id="ongkir"
            name="ongkir"
            type="number"
            value={formData.ongkir}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="diskon">Discount</label>
          <Input
            id="diskon"
            name="diskon"
            type="number"
            value={formData.diskon}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <Button type="button" onClick={addProductDetail} className="mt-4">
          Tambah Produk
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Kode Barang</TableHead>
              <TableHead>Nama Barang</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Harga Bandrol</TableHead>
              <TableHead>Diskon (%)</TableHead>
              <TableHead>Harga Diskon</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.details.map((detail, index) => {
              const product = products.find(
                (product) => product.kode === detail.barang_kode
              );
              const hargaBandrol = product ? product.harga : 0;
              const hargaDiskon =
                hargaBandrol - (hargaBandrol * detail.diskon_pct) / 100;
              const total = hargaDiskon * detail.qty;

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Select
                      value={detail.barang_kode || ""}
                      onValueChange={(value) =>
                        handleDetailChange(index, "barang_kode", value)
                      }>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Barang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Pilih Barang</SelectLabel>
                          {products?.map((product) => (
                            <SelectItem value={product.kode} key={product.id}>
                              {`${product.kode} - ${product.nama}`}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{product ? product.nama : ""}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={detail.qty}
                      onChange={(e) =>
                        handleDetailChange(index, "qty", e.target.value)
                      }
                      placeholder="Quantity"
                      min="1"
                    />
                  </TableCell>
                  <TableCell>{toRupiah(hargaBandrol)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={detail.diskon_pct}
                      onChange={(e) =>
                        handleDetailChange(index, "diskon_pct", e.target.value)
                      }
                      placeholder="Discount %"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </TableCell>
                  <TableCell>{toRupiah(hargaDiskon)}</TableCell>
                  <TableCell>{toRupiah(total)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveDetail(index)}>
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            {[
              { text: "Sub Total", value: subTotal },
              { text: "Diskon", value: formData.diskon },
              { text: "Ongkir", value: formData.ongkir },
              { text: "Total Bayar", value: totalBayar },
            ].map((e, index) => (
              <TableRow key={index}>
                <TableCell colSpan={5} />
                <TableCell colSpan={1} className="font-bold text-right">
                  {e.text}
                </TableCell>
                <TableCell colSpan={3} className="text-right font-bold">
                  {toRupiah(e.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableFooter>
        </Table>

        <div className="flex justify-end space-x-2 mt-4">
          <Link href={"/"}>
            <Button type="button" variant="outline">
              Batal
            </Button>
          </Link>
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </div>
  );
}
