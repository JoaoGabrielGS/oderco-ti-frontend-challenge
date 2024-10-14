import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Encontrar um usuário pelo id
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  return new Response(JSON.stringify(user), { status: 200 });
}

// DELETE: Deletar um usuário
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.user.delete({
    where: { id: Number(params.id) },
  });

  return new Response(null, { status: 204 });
}