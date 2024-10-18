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
import { redirect } from "next/navigation";

const UserProfileMenu = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const findUserById = async () => {
      if (session?.user?.id) {
        const res = await UserGetById(session.user.id);
        setUserData(res);
      }
    };

    findUserById();
  }, [session]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{userData?.profileImgUrl && <ProfileImage img={userData.profileImgUrl} />}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfileMenu;