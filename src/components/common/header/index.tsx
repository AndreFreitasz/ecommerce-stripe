"use client";

import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const { data: session } = authClient.useSession();
  const logout = () => authClient.signOut();

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="BEWEAR"
          width={100}
          height={26.14}
          className="cursor-pointer"
        />
      </Link>

      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session.user.image || ""}
                          alt="User Avatar"
                        />
                        <AvatarFallback>
                          {session?.user.name?.split("")[0][0]}
                          {session?.user.name?.split("")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{session?.user.name}</h3>
                        <p className="text-muted-foreground block text-xs">
                          {session?.user.email}
                        </p>
                      </div>
                    </div>
                    <Button size="icon" variant="outline" onClick={logout}>
                      <LogOutIcon />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button size="icon" asChild variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
