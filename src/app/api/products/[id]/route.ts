import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

//Encontrar um produto pelo id
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  return new Response(JSON.stringify(product), { status: 200 });
}

//DELETE: Deletar um produto
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({
    where: { id: Number(params.id) },
  });

  return new Response(null, { status: 204 });
}

//PATH: Atualizar um produto
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const formData = await req.formData();
  const updateData: any = {};

  if (formData.has('name')) updateData.name = formData.get('name');
  if (formData.has('description')) updateData.description = formData.get('description');
  if (formData.has('price')) updateData.price = Number(formData.get('price'));
  if (formData.has('category')) updateData.category = formData.get('category');
  if (formData.has('createdAt')) updateData.createdAt = new Date(formData.get('createdAt') as string);
  if (formData.has('salesCount')) updateData.salesCount = Number(formData.get('salesCount'));
  if (formData.has('isActive')) updateData.isActive = formData.get('isActive') === 'true';

  const updatedProduct = await prisma.product.update({
    where: { id: Number(params.id) },
    data: updateData,
  });

  return new Response(JSON.stringify(updatedProduct), { status: 200 });
}