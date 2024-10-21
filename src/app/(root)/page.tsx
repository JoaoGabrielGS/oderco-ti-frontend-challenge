import { getServerSession } from "next-auth";
import React from "react";
import UserProfileMenu from "@/components/ui/userProfileMenu";
import AppPage from "@/components/ui/appPage";
import ProductList from "@/components/ui/productList";
import Cart from "@/components/ui/cart";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession()

  const headerContent = (
    <>
      <h1 className="flex-1">Aqui é onde ficar a logo: ODERCO GAMER</h1>
      <Cart />
      <div className="mt-2">
        <UserProfileMenu />
      </div>
    </>
  );

  if (!session) {
    redirect('/login')
  }

  return (
    <AppPage headerContent={headerContent}>
      <div className="w-full h-full">
        <ProductList />
      </div>
    </AppPage>
  )
}