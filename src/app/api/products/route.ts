import { barangKodeGenerator } from "@/utils/kode_generator";
import { productSchema } from "@/utils/zod-schemas/product";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const products = await prisma.m_barang.findMany();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsedData = productSchema.parse(data);

    const { nama, harga } = parsedData;
    const code = barangKodeGenerator(nama, harga);

    const prodData = { kode: code, ...parsedData };
    console.log("🚀 ~ POST ~ prodData:", prodData);

    const product = await prisma.m_barang.create({ data: prodData });
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
