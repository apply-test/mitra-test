import { customerKodeGenerator } from "@/utils/kode_generator";
import { customerSchema } from "@/utils/zod-schemas/customer";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  // GET all customers
  try {
    const customers = await prisma.m_customer.findMany();
    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function POST(request: Request) {
  // POST a new customer
  try {
    const data = await request.json();
    const parsedData = customerSchema.parse(data);

    const { nama, telp } = parsedData;

    const code = customerKodeGenerator(nama, telp);
    console.log("🚀 ~ POST ~ code:", code);

    const custData = { ...parsedData, kode: code };

    const customer = await prisma.m_customer.create({ data: custData });
    return new Response(JSON.stringify(customer), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
