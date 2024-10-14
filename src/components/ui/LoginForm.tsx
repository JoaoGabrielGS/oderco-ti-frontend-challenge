"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

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
  const searchParams = useSearchParams();
  const [errorVisible, setErrorVisible] = React.useState(false);

  useEffect(() => {
    setErrorVisible(searchParams.get('error') === 'CredentialsSignin')
  }, [ searchParams ])

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
    <>
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
        </form>
      </Form>
      <Dialog open={errorVisible} onOpenChange={setErrorVisible}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Erro</DialogTitle>
          <DialogDescription>
            Usuário ou senha incorretos
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Tudo bem
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}