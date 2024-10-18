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
  const createdAt = new Date(formData.get('createdAt') as string);
  const salesCount = Number(formData.get('salesCount'));
  const file = formData.get('productImage') as File;

  let productImageUrl = null;

  if (file && file.size > 0) {
    const fileName = `procut-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/product-images', fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    productImageUrl = `/product-images/${fileName}`;
  }

  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      createdAt,
      salesCount,
      productImgUrl: productImageUrl,
    }
  })

  return new Response(JSON.stringify(newProduct), { status: 201 })
}

//GET: Buscar todos os produtos
export async function GET(req: NextRequest) {
  const pageParams = getPageParams(req);
  const result = await pagedQuery(prisma.product, pageParams, {
    where: {
      name: {
        contains: req.nextUrl.searchParams.get('search') ?? undefined,
      },
      category: {
        contains: req.nextUrl.searchParams.get('category') ?? undefined,
      },
    },
    orderBy: {
      createdAt: req.nextUrl.searchParams.get('order') === 'asc' ? 'asc' : 'desc',
    }
  });

  return new Response(JSON.stringify(result), { status: 200 })
}

//PATH: Atualizar um produto
export async function PATCH(req: Request) {
  const { id, name, description, price, category, createdAt, salesCount } = await req.json();

  const updateProduct = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
      price,
      category,
      createdAt,
      salesCount,
    }
  });

  return new Response(JSON.stringify(updateProduct), { status: 200 });
}