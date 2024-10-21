"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductRegister } from "../../../services/product";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "./toast";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const formSchema = z.object({
  name: z.string({ required_error: 'Por favor, digite o nome do produto' }),
  description: z.string({ required_error: 'Por favor, digite a descrição do produto' }),
  price: z.coerce.number({ required_error: 'Por favor, digite o valor do produto' }).min(1),
  category: z.string({ required_error: 'Por favor, selecione a categoria do produto' }),
  productImage: z.any(),
})

interface CreateProductFormProps {
  onProductCreated: () => void;
}

export function CreateProductForm({ onProductCreated }: CreateProductFormProps) {
  const [productImage, setProductImage] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      productImage: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('category', data.category);
    if (productImage) {
      formData.append('productImage', productImage);
    }

    ProductRegister({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      productImage: productImage as File,
      salesCount: 0,
    }).then(res => {
      if (res.ok) {
        toast({ title: "Produto criado com sucesso! ", variant: 'success' });
        form.reset();
        setProductImage(null);
        onProductCreated(); // Chama a função para atualizar a lista de produtos
        return;
      }

      return toast({
        title: 'Ops',
        description: 'Algo deu errado, revise os campos por favor!',
        variant: 'destructive',
        action: <ToastAction altText="Tente novamente">Tudo bem</ToastAction>,
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Nome</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Digite o nome do produto..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Descrição</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Digite uma breve descrição do produto..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Valor (R$)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Digite o valor do produto..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Categoria</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="border border-gray-300">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Keyboards">Teclados</SelectItem>
                    <SelectItem value="Mouses">Mouses</SelectItem>
                    <SelectItem value="Headsets">Headsets</SelectItem>
                    <SelectItem value="Microphones">Microfones</SelectItem>
                    <SelectItem value="ComputerCases">Gabinetes</SelectItem>
                    <SelectItem value="Joysticks">Controles</SelectItem>
                    <SelectItem value="GraphicsCards">Placas de Vídeo</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productImage"
          render={() => (
            <FormItem>
              <FormLabel className="font-bold">Imagem do Produto</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => setProductImage(e.target.files?.[0] || null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="info">Criar produto</Button>
      </form>
    </Form>
  )
}