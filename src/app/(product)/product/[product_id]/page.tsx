import AppPage from "@/components/ui/appPage";
import Cart from "@/components/ui/cart";
import ProductInfo from "@/components/ui/product";
import UserProfileMenu from "@/components/ui/userProfileMenu";

export default function ProductId() {

  const headerContent = (
    <>
      <div className="flex-1">
        <img src="/logo/logo.png" alt="Logo" />
      </div>
      <Cart />
      <div className="mt-2">
        <UserProfileMenu />
      </div>
    </>
  );
  return (
    <AppPage headerContent={headerContent}>
      <ProductInfo />
    </AppPage>
  )
} 