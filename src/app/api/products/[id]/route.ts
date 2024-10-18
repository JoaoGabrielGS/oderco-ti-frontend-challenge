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