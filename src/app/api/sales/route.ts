import { salesKodeGenerator } from "@/utils/kode_generator";
import { salesSchema } from "@/utils/zod-schemas/sales";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const discount = searchParams.get("discount");

  try {
    const query: any = {
      include: { customer: true, details: { include: { barang: true } } },
    };

    if (search) {
      query.where = {
        customer: {
          nama: {
            contains: search,
            mode: "insensitive",
          },
        },
      };
    }

    if (discount !== null) {
      query.where = {
        ...query.where,
        diskon: discount === "true" ? { gt: 0 } : 0,
      };
    }

    if (sort) {
      if (sort === "tgl_asc" || sort === "tgl_desc") {
        query.orderBy = {
          tgl: sort === "tgl_asc" ? "asc" : "desc",
        };
      } else if (sort === "nama_asc" || sort === "nama_desc") {
        query.orderBy = {
          customer: {
            nama: sort === "nama_asc" ? "asc" : "desc",
          },
        };
      } else if (sort === "total_asc" || sort === "total_desc") {
        query.orderBy = {
          total_bayar: sort === "total_asc" ? "asc" : "desc",
        };
      }
    }

    const sales = await prisma.t_sales.findMany(query);

    if (sales.length === 0) {
      return new Response(JSON.stringify({ message: "No sales found" }), {
        status: 404,
      });
    }

    const grandTotal = sales.reduce((acc, sale) => acc + sale.total_bayar, 0);

    return new Response(
      JSON.stringify({ data: sales, grand_total: grandTotal }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsedData = salesSchema.parse(data);

    const { details, tgl, cust_id, ongkir, diskon } = parsedData;

    let subtotal = 0;
    let totalDiscount = parseFloat(diskon) || 0;
    let totalPayment = 0;

    const salesDetails = await Promise.all(
      details.map(async (item) => {
        const { barang_kode, qty, diskon_pct } = item;

        const barang = await prisma.m_barang.findUnique({
          where: { kode: barang_kode },
        });

        if (!barang) {
          throw new Error(`Barang with code ${barang_kode} not found`);
        }

        const harga_bandrol = barang.harga;
        const diskon_nilai = (harga_bandrol * parseFloat(diskon_pct)) / 100;
        const harga_diskon = harga_bandrol - diskon_nilai;
        const total = harga_diskon * parseInt(qty, 10);

        subtotal += harga_bandrol * parseInt(qty, 10);
        totalDiscount += diskon_nilai * parseInt(qty, 10);
        totalPayment += total;

        return {
          barang_id: barang.id,
          harga_bandrol,
          qty: parseInt(qty, 10),
          diskon_pct: parseFloat(diskon_pct),
          diskon_nilai,
          harga_diskon,
          total,
        };
      })
    );

    totalPayment += parseFloat(ongkir) || 0;

    const kode = salesKodeGenerator(new Date(tgl), cust_id, subtotal);

    const sale = await prisma.t_sales.create({
      data: {
        kode,
        tgl: new Date(tgl),
        cust_id,
        subtotal,
        diskon: totalDiscount,
        ongkir: parseFloat(ongkir) || 0,
        total_bayar: totalPayment,
      },
    });

    const salesDetailsWithId = salesDetails.map((item) => ({
      ...item,
      sales_id: sale.id,
    }));

    const saleDetails = await prisma.t_sales_det.createMany({
      data: salesDetailsWithId,
    });

    const saleWithDetails = { ...sale, details: saleDetails };

    return new Response(JSON.stringify(saleWithDetails), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
