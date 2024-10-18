import { Paged } from "@/app/api/paged";
import { Category } from "@/enums/category.enum";
import { Product } from "@prisma/client";

export function ProductRegister(form: { name: string; description: string; price: number; category: string; createdAt: Date, salesCount: number; productImgUrl: File }) {
  const formData = new FormData();

  formData.append('name', form.name);
  formData.append('description', form.description);
  formData.append('price', form.price.toString());
  formData.append('category', form.category);
  formData.append('createdAt', form.createdAt.toISOString());
  formData.append('salesCount', form.salesCount.toString());

  if (form.productImgUrl) {
    formData.append('productImgUrl', form.productImgUrl);
  }

  return fetch('/api/products', {
    method: 'POST',
    body: formData,
  })
}

export async function ProductList(params: { search?: string; category?: Category; order?: 'asc' | 'desc'; page?: number, paze_size?: number } = {}): Promise<Paged<Product>> {
  const url = new URL('/api/products', window.location.origin);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, String(value));
  }

  return fetch(url, {
    method: 'GET',
  }).then(res => res.json())
}