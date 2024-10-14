"use client"

import { signOut } from "next-auth/react"
import { Button } from "./button"

export default function Logout() {
  return (
    <Button variant={"destructive"} onClick={() => signOut()}>LogOut</Button>
  )
}