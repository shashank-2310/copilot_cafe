"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogInIcon, LogOutIcon, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import logo from "@/assets/logo.png"
import Image from "next/image";
import Link from "next/link";


function AccountDropdown() {
    const session = useSession();
    const isLoggedIn = !!session.data;


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"}>
                    <Avatar className="mr-2">
                        <AvatarImage src={session.data?.user?.image ?? ""} />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    {session.data?.user?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem onClick={() => signOut({
                    callbackUrl: "/"
                })}>
                    <LogOutIcon className="mr-2" /> Sign Out
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function Header() {
    const session = useSession();
    return (
        <header className="container mx-auto py-2 dark:bg-gray-900 bg-gray-200 rounded-3xl">
            <div className="flex justify-between items-center ">
                <Link href={"/"} className="flex gap-2 items-center text-xl hover:underline">
                    <Image className="bg-white aspect-square rounded-full p-1 w-1/4" src={logo} alt="logo" width={70} height={70} />
                    CoPilot Cafe
                </Link>
                <div className="flex gap-4 justify-between items-center">
                    {session.data && <AccountDropdown />}
                    {!session.data &&
                        <Button variant={"link"} onClick={() => signIn("google")}>
                            <LogInIcon className="mr-2" />  Sign In
                        </Button>
                    }
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}