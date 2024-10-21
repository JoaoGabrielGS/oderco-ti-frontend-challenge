"use client";

import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

export default function Cart() {
  const router = useRouter();

  return (
    <div className="!w-10 !h-8 relative cursor-pointer" onClick={() => router.push('/cart')}>
      <FiShoppingCart size={28} color="#71717a" className="bottom-0 absolute" />
      <div className="h-4 w-4 text-xs rounded-full bg-info text-background flex items-center justify-center absolute top-0 right-0">
        {JSON.parse(localStorage.getItem("Cart") ?? '[]').length}
      </div>
    </div>
  )
}