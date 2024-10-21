"use client";

import { Product } from "@prisma/client";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { ProductGetById } from "../../../services/product";
import { Button } from "./button";
import ProductImage from "./product-image";
import { FiShoppingCart } from "react-icons/fi";

type CartItem = {
  product: Product;
  quantity: number;
};

export default function ProductInfo() {
  const params = useParams();
  const [productId, setProductId] = useState<Product>();

  function addNewProductToCart(product: Product) {
    if (!product) return;

    const cart: CartItem[] = JSON.parse(localStorage.getItem("Cart") ?? "[]");

    const existingProductIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    localStorage.setItem("Cart", JSON.stringify(cart));
  }

  useEffect(() => {
    ProductGetById(Number(params.product_id)).then(res => setProductId(res));
  }, [])

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <h1 className="font-medium text-xl mb-4">{productId?.name}</h1>
      <div className="flex gap-6">
        <div>
          {productId?.productImgUrl && <ProductImage img={productId.productImgUrl} width={250} height={250} />}
        </div>
        <div className="flex flex-col h-full gap-20 p-4">
          {productId && <div className="flex-1">
            <h1 className="text-info text-[30px] font-medium">R$ {productId?.price.toFixed(2)}</h1>
            <p className="text-sm">*Frete grátis para compras aciam de R$ 900,00.</p>
          </div>}
          {productId && <Button variant="info" className="!px-10 !py-8" onClick={() => addNewProductToCart(productId)}>
            <div className="flex items-center gap-2">
              <p className="uppercase">Adicionar ao carrinho</p>
              <FiShoppingCart size={20} color="#71717a" className="!text-white" />
            </div>
          </Button>}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {productId && <h1 className="font-medium text-xl mb-4">Descrição</h1>}
        <p className="text-sm">{productId?.description}</p>
      </div>
    </div>
  )
}