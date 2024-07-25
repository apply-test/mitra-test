import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { kode: string } }
) {
  const { kode } = params;
  try {
    const sale = await prisma.t_sales.findUnique({
      where: { kode },
      include: { customer: true, details: true },
    });

    if (!sale) {
      return new Response(JSON.stringify({ error: "Sale not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(sale), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
