"use client";

import AppPage from "./appPage";
import { Input } from "./input";
import UserProfileMenu from "./userProfileMenu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select";
import { useEffect, useState } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { CreateProductForm } from "./createProduct";
import { DeleteProductById, ProductList, UpdateProductById } from "../../../services/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./table";
import { Checkbox } from "./checkbox";
import ProductImage from "./product-image";
import { Product } from "@prisma/client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState<number>();
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    ProductList({ order: orderBy, search: search, page: page, page_size: 8 }).then((res) => {
      setProducts(res.items);
      setTotalPages(res.total_pages)
    });
  }, [orderBy, search, page]);

  async function deleteProdut(data: Product) {
    await DeleteProductById(data.id)

    ProductList({ page_size: 12, }).then(result => {
      setProducts(result.items);
    });
  }

  async function toggleIsActive(product: Product) {
    await UpdateProductById(product.id, { isActive: !product.isActive });
  };

  const categoryTranslation: { [key: string]: string } = {
    Keyboards: "Teclados",
    Mouses: "Mouses",
    Headsets: "Headsets",
    Microphones: "Microfones",
    ComputerCases: "Gabinetes",
    Joysticks: "Controles",
    GraphicsCards: "Placas de Vídeo",
  };

  const translateCategory = (category: string): string => {
    return categoryTranslation[category] || category;
  };

  const headerContent = (
    <>
      <h1 className="flex-1">Aqui é onde ficar a logo: ODERCO GAMER</h1>
      <UserProfileMenu />
    </>
  );
  return (
    <AppPage headerContent={headerContent}>
      <h1 className="font-bold text-lg">Produtos</h1>
      <div className="flex gap-4 justify-between">
        <div className="w-[50%] flex gap-4">
          <Input type="search" placeholder="Pesquisar" onChange={(e) => setSearch(e.currentTarget.value)} />
          <Select onValueChange={(value) => setOrderBy(value as 'asc' | 'desc')} defaultValue="asc">
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent defaultValue={"asc"}>
              <SelectItem value="asc">Mais antigos</SelectItem>
              <SelectItem value="desc">Mais recentes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="info" className="!px-10">Cadastrar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Produto</DialogTitle>
              </DialogHeader>
              <CreateProductForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead><Checkbox /></TableHead>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox
                  checked={product.isActive}
                  onCheckedChange={() =>
                    toggleIsActive(product)
                  }
                />
              </TableCell>

              <TableCell>
                {product.productImgUrl && <ProductImage img={product.productImgUrl} width={50} height={100} />}
              </TableCell>

              <TableCell>{product.name}</TableCell>

              <TableCell>{translateCategory(product.category)}</TableCell>

              <TableCell>R$ {product.price.toFixed(2)}</TableCell>

              <TableCell>
                <Button variant="destructive" onClick={() => deleteProdut(product)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          {page > 0 && <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => setPage(page - 1)} />
          </PaginationItem>}
          {Array.from({ length: totalPages ?? 1 }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink className={`cursor-pointer ${page === index ? 'bg-info text-white' : ''}`} onClick={() => setPage(index)}>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
          {(page < (totalPages ?? 1)) && <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => setPage(page + 1)} />
          </PaginationItem>}
        </PaginationContent>
      </Pagination>
    </AppPage>
  )
}