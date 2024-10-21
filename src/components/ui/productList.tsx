"use client";

import { Product } from "@prisma/client"
import React, { useEffect, useMemo, useState } from "react"
import { ProductList } from "../../../services/product";
import { Card } from "./card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ProductImage from "./product-image";
import { useRouter } from "next/navigation";
import { Input } from "./input";
import { RiArrowLeftRightFill } from "react-icons/ri";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"
import { ScrollArea } from "./scroll-area";

const Products = () => {
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set<string>());
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc');
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10000);
  const [totalPages, setTotalPages] = useState<number>();
  const [page, setPage] = useState<number>(0)
  const [search, setSearch] = useState('');
  const router = useRouter();

  function checkedChange(category: string, isChecked: boolean) {
    setSelectedCategories((oldValue) => {
      if (isChecked) {
        oldValue.add(category);
      } else {
        oldValue.delete(category);
      }

      return new Set(oldValue);
    })
  }

  const categoryList = useMemo(() => [
    {
      label: 'Teclados',
      value: 'Keyboards',
    },
    {
      label: 'Mouses',
      value: 'Mouses',
    },
    {
      label: 'Headsets',
      value: 'Headsets',
    },
    {
      label: 'Microfones',
      value: 'Microphones',
    },
    {
      label: 'Gabinetes',
      value: 'ComputerCases',
    },
    {
      label: 'Controles',
      value: 'Joysticks',
    },
    {
      label: 'Placas de vídeo',
      value: 'GraphicsCards',
    },
  ], [])

  useEffect(() => {
    ProductList({ page_size: 12, order: orderBy, category: Array.from(selectedCategories), minPrice: min, maxPrice: max, page: page, search: search }).then(result => {
      setAllProducts(result.items);
      setTotalPages(result.total_pages);
    });
  }, [orderBy, selectedCategories, min, max, page, search])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex gap-4 flex-1 overflow-hidden">
        <div>
          <Select onValueChange={(value) => setOrderBy(value as 'asc' | 'desc')} defaultValue="asc">
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent defaultValue={"asc"}>
              <SelectItem value="asc">Mais antigos</SelectItem>
              <SelectItem value="desc">Mais recentes</SelectItem>
            </SelectContent>
          </Select>

          <Card className="p-4 mt-4">
            <div className="flex justify-between text-xs mx-1">
              <p>Preço</p>
              <p>R$0 a 10.000,00</p>
            </div>
            <div className="flex items-center gap-4 my-4">
              <Input type="number" defaultValue={0} className="w-20 text-xs" placeholder="R$ 00,00" onChange={(e) => setMin(Number(e.currentTarget.value))} />
              <RiArrowLeftRightFill />
              <Input type="number" defaultValue={10000} className="w-20 text-xs" placeholder="R$ 00,00" onChange={(e) => setMax(Number(e.currentTarget.value))} />
            </div>
            <p className="font-bold text-sm mb-2">Categorias</p>
            {categoryList.map(c => (
              <div key={c.value} className="flex items-center gap-2 mb-2">
                <Checkbox checked={selectedCategories.has(c.value)} onCheckedChange={(isChecked: boolean) => checkedChange(c.value, isChecked)} />
                <p className="text-sm">{c.label}</p>
              </div>
            ))}
          </Card>
        </div>
        <ScrollArea className="flex-1 overflow-hidden">
          <Input type="search" placeholder="O que você está buscando?" onChange={(e) => setSearch(e.currentTarget.value)} className="mb-4 !w-[30%]" />
          {
            allProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-20">
                <p className="text-lg font-semibold text-gray-500">Nenhum produto encontrado</p>
                <p className="text-sm text-gray-400 mt-2">Tente ajustar os filtros ou pesquisar novamente</p>
              </div>
            )
          }
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
            {allProducts.map(product => (
              product.isActive && (
                <div key={product.id}>
                  <Card onClick={() => { router.push(`/product/${product.id}`) }} className="p-2 cursor-pointer">
                    <div className="flex justify-center">
                      {product.productImgUrl && <ProductImage img={product.productImgUrl} width={200} height={300} />}
                    </div>
                    <p className="text-sm mt-2">{product.name}</p>
                    <p className="font-bold">R$ {product.price.toFixed(2)}</p>
                  </Card>
                </div>
              )
            ))}
          </div>
        </ScrollArea>
      </div>
      <Pagination>
        <PaginationContent>
          {page > 1 && <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => setPage(page - 1)} />
          </PaginationItem>}
          {Array.from({ length: totalPages ?? 1 }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink className={`cursor-pointer ${page === index ? 'bg-info text-white' : ''}`} onClick={() => setPage(index + 1)}>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
          {(page < (totalPages ?? 1)) && <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => setPage(page + 1)} />
          </PaginationItem>}
        </PaginationContent>
      </Pagination>
    </div>
  )
}


export default Products