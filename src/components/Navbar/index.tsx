import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Navbar() {
  const dropdownMenuItems: { title: string; href: string }[] = [
    {
      title: "Equações",
      href: "/equations",
    },
    {
      title: "Documentação da API",
      href: "https://api-calculonumerico.onrender.com/docs/#/",
    },
  ];
  return (
    <>
      <NavigationMenu className="fixed min-w-full justify-between px-4 py-4 bg-zinc-100 border-b-2 sm:px-10">
        <Link to="/">
          <h1 className="text-xl">NumericSolve</h1>
        </Link>
        <NavigationMenuList>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex md:hidden">
              <IoMenu className="text-2xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dropdownMenuItems.map((i) => {
                return (
                  <DropdownMenuItem className="cursor-pointer" key={i.href}>
                    <Link
                      to={i.href}
                      target={i.href === "/equations" ? "" : "_blank"}
                    >
                      {i.title}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuItem className="cursor-pointer">
                <a
                  href="https://github.com/jvictordev1/numericsolve"
                  target="_blank"
                >
                  Github
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden md:flex">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col md:w-[400px] lg:w-[500px]">
                  <ListItem href="/equations" title="Equações">
                    Solucione suas equações através de um dos métodos.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="https://api-calculonumerico.onrender.com/docs/#/"
                target="_blank"
              >
                Documentação da API
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="https://github.com/jvictordev1/numericsolve"
                target="_blank"
              >
                Github
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
