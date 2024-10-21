import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest } from "next/server";
import path from "path";
import { getPageParams, pagedQuery } from "../paged";

const prisma = new PrismaClient();

// POST: Criar um novo produto
export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = Number(formData.get('price'));
  const category = formData.get('category') as string;
  const salesCount = Number(formData.get('salesCount'));
  const file = formData.get('productImage') as File;

  let productImgUrl = null;

  if (file && file.size > 0) {
    const fileName = `procut-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/product-images', fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    productImgUrl = `/product-images/${fileName}`;
  }

  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      salesCount,
      productImgUrl,
    }
  })

  return new Response(JSON.stringify(newProduct), { status: 201 })
}

//GET: Buscar todos os produtos
export async function GET(req: NextRequest) {
  const pageParams = getPageParams(req);
  const category = req.nextUrl.searchParams.getAll('category');
  const minPrice = req.nextUrl.searchParams.get('minPrice');
  const maxPrice = req.nextUrl.searchParams.get('maxPrice');
  const result = await pagedQuery(prisma.product, pageParams, {
    where: {
      name: {
        contains: req.nextUrl.searchParams.get('search') ?? undefined,
      },
      category: {
        in: category.length > 0 ? category : undefined,
      },
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      }
    },
    orderBy: {
      createdAt: req.nextUrl.searchParams.get('order') === 'asc' ? 'asc' : 'desc',
    }
  });

  return new Response(JSON.stringify(result), { status: 200 })
}