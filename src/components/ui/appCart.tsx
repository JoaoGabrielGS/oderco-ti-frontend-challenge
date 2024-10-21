"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import AppPage from "./appPage";
import { Card } from "./card";
import ProductImage from "./product-image";
import UserProfileMenu from "./userProfileMenu";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./select";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { useRouter } from "next/navigation";

export default function AppCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("Cart") ?? "[]");
    setCartItems(cart);
  }, []);

  const totalPrice = cartItems.reduce(
    (acc: number, item: { product: { price: number }; quantity: number }) =>
      acc + item.product.price * item.quantity,
    0
  );

  function updateProductQuantity(productId: number, quantity: number) {
    const updatedCart = cartItems.map((item: any) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }

  function removeProductFromCart(productId: number) {
    const updatedCart = cartItems.filter((item: any) => item.product.id !== productId);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }

  const headerContent = (
    <>
      <h1 className="flex-1">Aqui é onde ficar a logo: ODERCO GAMER</h1>
      <div className="mt-2">
        <UserProfileMenu />
      </div>
    </>
  );

  return (
    <AppPage headerContent={headerContent}>
      <div className="flex gap-4 h-full w-full !overflow-hidden">
        <div className="w-[60%] !overflow-hidden flex flex-col h-full">
          <h1 className="font-medium text-lg uppercase mb-4">Seu Carrinho</h1>
          <div className="flex gap-1 mb-4 text-xs">
            <p>Total ({cartItems.length} itens)</p>
            <p className="font-bold">R${totalPrice.toFixed(2)}</p>
          </div>
          <ScrollArea className="flex-1">
            {cartItems.length > 0 ? (
              cartItems.map((item: any) => (
                <Card key={item.product.id} className="mb-6 p-6 flex gap-4">
                  <div>
                    <ProductImage img={item.product.productImgUrl} width={75} height={75} />
                  </div>
                  <div className="flex-1">
                    <p>{item.product.name}</p>
                    <Select
                      value={String(item.quantity)}
                      onValueChange={(value) => updateProductQuantity(item.product.id, Number(value))}
                    >
                      <SelectTrigger className="max-w-max px-6">
                        <SelectValue placeholder="Quantidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((qtd) => (
                          <SelectItem key={qtd} value={String(qtd)}>
                            {qtd}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <IoCloseOutline className="!text-destructive text-lg cursor-pointer" onClick={() => removeProductFromCart(item.product.id)} />
                    <p className="font-bold">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-lg font-medium text-gray-600">Seu carrinho está vazio.</p>
                <p className="text-sm text-gray-500">Adicione itens ao carrinho para prosseguir com a compra.</p>
                <Button variant="info" className="uppercase text-sm !px-10" onClick={() => router.push('/')}>
                  Voltar ao catálogo
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
        <div className="flex-1">
          <Card className="p-4 h-full">
            <h1 className="font-medium uppercase text-lg mb-4">
              Resumo do pedido
            </h1>
            <div className="flex gap-2 mb-2 text-xs">
              <p className="flex-1 uppercase">Subtotal</p>
              <p>R$ {totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex gap-2 uppercase text-xs">
              <p className="flex-1">Entrega</p>
              <p>R$ 200.00</p>
            </div>
            <div className="h-[1px] bg-black my-4" />
            <div className="flex gap-2 uppercase text-xs font-semibold mb-10">
              <p className="flex-1">Total</p>
              <p>R$ {(totalPrice + 200).toFixed(2)}</p>
            </div>
            <Button variant="info" className="uppercase text-sm !w-full !py-6" onClick={() => {
              localStorage.clear();
              setCartItems([]);
              router.push('/');
            }}>Finalizar compra</Button>
          </Card>
        </div>
      </div>
    </AppPage>
  );
}
