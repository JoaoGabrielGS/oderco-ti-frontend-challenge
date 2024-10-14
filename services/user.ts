import { Paged } from "@/app/api/paged";
import { User } from "@prisma/client";

export function UserRegister(form: { name: string; email: string; password: string; profileImage?: File }) {
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('email', form.email);
  formData.append('password', form.password);
  if (form.profileImage) {
    formData.append('profileImage', form.profileImage);
  }

  return fetch('/api/users', {
    method: 'POST',
    body: formData,
  })
}

export async function UserList(params: { search?: string; page?: number, page_size?: number } = {}): Promise<Paged<User>> {
  const url = new URL('/api/users', window.location.origin);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, String(value));
  }
  return fetch(url, {
    method: 'GET',
  }).then(res => res.json())
}

export function UserGetById(id: string | number) {
  return fetch(`/api/users/${id}`, {
    method: 'GET',
  }).then(res => res.json())
}

export function DeleteUserById(id: string | number) {
  return fetch(`/api/users/${id}`, {
    method: 'DELETE',
  })
}