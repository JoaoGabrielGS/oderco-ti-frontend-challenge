import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { getPageParams, pagedQuery } from '../paged';
import { NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

// POST: Criar um novo usuário
export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const file = formData.get('profileImage') as File;

  const hash = await bcrypt.hash(password, 10);

  let profileImgUrl = null;

  if (file && file.size > 0) {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer)

    profileImgUrl = filePath;
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      profileImgUrl,
    },
  });

  return new Response(JSON.stringify(newUser), { status: 201 });
}

// GET: Buscar todos os usuários
export async function GET(req: NextRequest) {
  const pageParams = getPageParams(req);
  const result = await pagedQuery(prisma.user, pageParams, {
    where: {
      name: {
        contains: req.nextUrl.searchParams.get('search') ?? undefined,
      }
    }
  });
  return new Response(JSON.stringify(result), { status: 200 });
}

// PATCH: Atualizar um usuário
export async function PATCH(req: Request) {
  const { id, name, email, password } = await req.json();

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      name,
      email,
      password,
    },
  });

  return new Response(JSON.stringify(updatedUser), { status: 200 });
}