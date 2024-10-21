import AppPage from "@/components/ui/appPage";
import Cart from "@/components/ui/cart";
import ProductInfo from "@/components/ui/product";

export default function ProductId() {
  const headerContent = (
    <>
      <h1 className="flex-1">Aqui é onde ficar a logo: ODERCO GAMER</h1>
      <Cart />
    </>
  );
  return (
    <AppPage headerContent={headerContent}>
      <ProductInfo />
    </AppPage>
  )
} 