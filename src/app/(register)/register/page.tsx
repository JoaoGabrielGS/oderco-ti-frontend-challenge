import { CreateUserForm } from "@/components/ui/createUser";

export default function Register() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-info">Criar Novo Usuário</h1>
      <p className="text-sm text-blue-600">Preencha os campos abaixo para criar um novo usuário.</p>
      <CreateUserForm />
      <img src="/logo/logo.png" />
    </>
  )
}