"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react"
import React from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

const schema = z.object({
  email: z.string({ required_error: 'O campo email é obrigatório' })
    .email('Digite um email válido')
    .min(3, 'O email deve ter pelo menos 3 caracteres')
    .max(50, 'O email deve ter no máximo 20 caracteres'),
  password: z.string({ required_error: 'O campo senha é obrigatório' })
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(100, 'A senha deve ter no máximo 100 caracteres'),
})

export default function LoginForm() {
  const router = useRouter();

  function onSubmit(data: z.infer<typeof schema>) {
    signIn("credentials", {
      ...data,
      callbackUrl: "/",
    })
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <Form {...form}>
      <form {...form} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem className="mb-8">
            <FormControl>
              <Input className="!text-xs" type="email" placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}>
        </FormField>
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem className="mb-8">
            <FormControl>
              <Input className="!text-xs" type="password" placeholder="Password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}>
        </FormField>
        <div className="flex justify-center items-center">
          <Button variant={"info"} className="!w-full" type="submit">Entrar</Button>
        </div>
        <div onClick={() => router.push('/register')} className="flex !items-center justify-center gap-4 mt-3 cursor-pointer">
          <FaUser className="text-info" />
          <p className="text-[12px] text-info underline" >Ainda não tem uma conta? Crie uma agora!</p>
        </div>
      </form>
    </Form>
  )
}