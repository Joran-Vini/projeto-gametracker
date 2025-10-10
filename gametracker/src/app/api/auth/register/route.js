import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prisma from "@/lib/prisma";

export async function POST(request) {
    
     try {
  // 1. Ler os dados que o formulário enviou.
  const body = await request.json();
  const { username, password } = body;
 
  //Checar se é valido
  if (!username || !password) {
    return new NextResponse(
        JSON.stringify({ error: 'Usuário e senha são obrigatórios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
  }
  const existingUser = await prisma.user.findUnique({
    where: {username: username},
  });
  console.log('PASSO 3: Verificação de usuário existente concluída.');
  if (existingUser) {
    return new NextResponse(
        JSON.stringify({ error: 'Este nome de usuário já está em uso.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } } 
      );
  }
  // 2. Criptografar a senha.

  const hashedPassword = await bcrypt.hash(password, 10);
  // 3. Salvar no banco de dados.

    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    });
  // 4. Retornar uma resposta.
    return NextResponse.json(newUser, {status: 201});
     }
    catch (error) {
        return new NextResponse(
      JSON.stringify({ error: 'Ocorreu um erro interno no servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    }
 
}