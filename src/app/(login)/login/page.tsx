import { Card } from "@/components/ui/card"
import LoginForm from "@/components/ui/LoginForm"
export default function Login() {

  return (
    <Card className="w-[400px] max-h-max p-10">
      <h1 className="text-center text-2xl mb-12">ODERCO GAMER</h1>
      <LoginForm />
    </Card>
  )
}