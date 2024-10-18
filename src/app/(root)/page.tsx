import { FiShoppingCart } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import React from "react";
import UserProfileMenu from "@/components/ui/userProfileMenu";
import AppPage from "@/components/ui/appPage";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default async function Page() {
  const session = await getServerSession()

  const headerContent = (
    <>
      <h1 className="flex-1">Aqui é onde ficar a logo: ODERCO GAMER</h1>
      <div className="!w-10 !h-8 relative">
        <FiShoppingCart size={28} color="#71717a" className="bottom-0 absolute" />
        <div className="h-4 w-4 text-xs rounded-full bg-info text-background flex items-center justify-center absolute top-0 right-0">4</div>
      </div>
      <UserProfileMenu />
    </>
  );

  const footerContent = (
    <>
      <div className="bg-red-800">
        <p>FOOOOOOOOTER</p>
      </div>
    </>
  )

  // if (!session) {
  //   redirect('/login')
  // }

  return (
    <AppPage headerContent={headerContent} footerContent={footerContent}>
      <div className="w-full h-full flex gap-4">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Mais recentes</SelectItem>
              <SelectItem value="dark">Mais antigos</SelectItem>
              <SelectItem value="system">Mais vendidos</SelectItem>
            </SelectContent>
          </Select>
          <Card className="max-h-max p-2 mt-4">
            s
          </Card>
        </div>
      </div>
    </AppPage>
  )
}