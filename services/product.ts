import { Paged } from "@/app/api/paged";
import { Product } from "@prisma/client";

export function ProductRegister(form: { name: string; description: string; price: number; category: string; salesCount: number; productImage: File; }) {
  const formData = new FormData();

  formData.append('name', form.name);
  formData.append('description', form.description);
  formData.append('price', form.price.toString());
  formData.append('category', form.category);
  formData.append('salesCount', form.salesCount.toString());
  formData.append('productImage', form.productImage);

  return fetch('/api/products', {
    method: 'POST',
    body: formData,
  })
}

export async function ProductList(params: { search?: string; category?: string[]; order?: 'asc' | 'desc'; minPrice?: number; maxPrice?: number; page?: number, page_size?: number } = {}): Promise<Paged<Product>> {
  const url = new URL('/api/products', window.location.origin);

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        url.searchParams.append(key, String(v));
      }
    } else if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return fetch(url, {
    method: 'GET',
  }).then(res => res.json())
}

export function ProductGetById(id: string | number) {
  return fetch(`/api/products/${id}`, {
    method: 'GET',
  }).then(res => res.json())
}

export function DeleteProductById(id: string | number) {
  return fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })
}

export function UpdateProductById(id: string | number, form: { name?: string; description?: string; price?: number; category?: string; salesCount?: number; productImage?: File, isActive?: boolean }) {
  const formData = new FormData();

  formData.append('id', id.toString());
  if (form.name) {
    formData.append('name', form.name);
  }
  if (form.description) {
    formData.append('description', form.description);
  }
  if (form.price) {
    formData.append('price', form.price.toString());
  }
  if (form.category) {
    formData.append('category', form.category);
  }
  if (form.salesCount) {
    formData.append('salesCount', form.salesCount.toString());
  }
  if (form.isActive !== undefined) {
    formData.append('isActive', form.isActive.toString());
  }

  if (form.productImage) {
    formData.append('productImage', form.productImage);
  }

  return fetch(`/api/products/${id}`, {
    method: 'PATCH',
    body: formData,
  });
}