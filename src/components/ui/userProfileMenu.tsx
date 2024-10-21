"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserGetById } from "../../../services/user";
import ProfileImage from "./profile-image";
import { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import React from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "./skeleton";

const UserProfileMenu = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const findUserById = async () => {
      if (session?.user?.id) {
        const res = await UserGetById(session.user.id);
        setUserData(res);
      }
    };

    findUserById();
  }, [session]);

  function logOut() {
    signOut();
    router.push('/login');
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{userData?.profileImgUrl ? <ProfileImage img={userData.profileImgUrl} /> : <Skeleton className="w-[40px] h-[40px] rounded-full" />}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => logOut()}>Logout</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/')}>Produtos</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/product/catalog')}>Catálogo de Produtos</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfileMenu;