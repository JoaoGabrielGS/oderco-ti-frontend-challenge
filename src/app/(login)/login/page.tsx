"use client"
import { Card } from "@/components/ui/card"
import LoginForm from "@/components/ui/loginForm"
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'CredentialsSignin') {
      router.push('/login')
    }
    toast({
      title: 'Ops!',
      description: 'Usuário ou senha incorretos',
      action: (<ToastAction altText="sdsdsds">Tudo bem</ToastAction>),
      variant: 'destructive',
    })
  }, [searchParams, toast, router])

  return (
    <Card className="w-[400px] max-h-max p-10">
      <div className="mb-4">
        <img src="/logo/logo.png" className="mx-auto" />
      </div>
      <LoginForm />
    </Card>
  )
}