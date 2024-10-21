"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserRegister } from "../../../services/user"
import { useState } from "react"
import { ToastAction } from "./toast"
import { useRouter } from "next/navigation"
import { Card } from "./card"

const FormSchema = z.object({
  name: z.string({ required_error: 'Por favor, digite o nome de usuário' }),
  email: z.string({ required_error: 'Por favor, digite um email válido' }),
  password: z.string({ required_error: 'Senha obrigatória!' }),
  profileImage: z.any(),
})

export function CreateUserForm() {
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profileImage: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    UserRegister({
      name: data.name,
      email: data.email,
      password: data.password,
      profileImage: profileImage || undefined,
    }).then(res => {
      if (res.ok) {
        toast({ title: "Usuário criado com sucesso!", variant: 'success' });
        form.reset();
        setProfileImage(null);
        return router.push('/login')
      }
      return toast({
        title: 'Ops', description: 'Algo deu errado, revise os campos por favor!', variant: 'destructive', action: <ToastAction altText="Tente novamente">Tudo bem</ToastAction>,
      });
    })
  }

  return (
    <Card className="!w-[500px] p-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Nome</FormLabel>
                <FormControl>
                  <Input type="name" placeholder="Digite o nome de usuário..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Digite um email válido..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Senha</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Digite a senha..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={() => (
              <FormItem>
                <FormLabel className="font-bold">Imagem de Perfil</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" variant="info">Criar usuário</Button>
        </form>
      </Form>
    </Card>
  )
}
