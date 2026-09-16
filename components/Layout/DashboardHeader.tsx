"use client";

import { Building2, Globe, Server, Timer, UserCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function HeaderMenu() {
  return (
    <header className="w-full border-b border-gray-200">
      {/* Navigation */}

      <NavigationMenu className="justify-between h-16 max-w-none w-full px-2 sm:px-5">
        <NavigationMenuList className="hidden sm:flex gap-2 flex-none">
          {/* Teams */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="
                  h-9
                  bg-transparent
                  px-3
                  font-medium
                "
            >
              <div className="flex items-center gap-1">
                <Globe size={16} />
                Domains
              </div>
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="w-80 p-2">
                <ListItem href="/teams/admin" title="Buy Domain">
                  Buy New Domain
                </ListItem>

                <ListItem href="/teams/developers" title="Transfer Domain">
                  Transfer Existing Domains to Us
                </ListItem>

                <ListItem href="/teams/sales" title="Manage Domain">
                  Manage Your Domains (e.g. DNS, SSL, WHOis)
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Departments */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="
                  h-9
                  bg-transparent
                  px-3
                  font-medium
                "
            >
              <div className="flex items-center gap-1">
                <Server size={16} />
                Hosting
              </div>
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="w-80 p-2">
                <ListItem href="/departments/admin" title="Shared Hosting">
                  Hosting with cPanel
                </ListItem>

                <ListItem
                  href="/departments/developers"
                  title="WordPress Hosting"
                >
                  Hosting for WordPress Websites
                </ListItem>

                <ListItem href="/departments/sales" title="VPS">
                  VPS Hosting
                </ListItem>

                <ListItem
                  href="/departments/marketing"
                  title="Dedicated Server"
                >
                  Dedicated Servers
                </ListItem>
                <ListItem href="/departments/marketing" title="Migrate Hosting">
                  Migrate Your Hosting to Us
                </ListItem>
                <ListItem
                  href="/departments/marketing"
                  title="Migrate WordPress"
                >
                  Migrate Your WordPress Website to Us
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {/* Calendar */}
            <NavigationMenuLink
              className="
                flex items-center gap-1 h-9
                  bg-transparent
                  px-3
                  font-medium
                "
            >
              <Timer size={16} strokeWidth={2} />

              <span>Expiring Soon</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="flex-none">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="
                  h-9
                  bg-transparent
                  px-3
                  font-medium
                  border
                "
            >
              <div className="flex items-center gap-2">
                <Building2
                  size={15}
                  strokeWidth={2.2}
                  className="text-primary"
                />
                <span>RichTec Professional</span>
              </div>
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="w-60 p-2 text-sm text-gray-700 divide-y">
                <Link
                  href={"/profile"}
                  className="flex items-center gap-1.5 py-3"
                >
                  <UserCircle size={18} />
                  <span>My Profile</span>
                </Link>
                <Link
                  href={"/domains"}
                  className="flex items-center gap-1.5 py-3"
                >
                  <Globe size={18} />
                  <span>My Domains</span>
                </Link>
                <Link
                  href={"/hosting"}
                  className="flex items-center gap-1.5 py-3"
                >
                  <Server size={18} />
                  <span>My Hostings</span>
                </Link>
                <Link
                  href={"/expiring"}
                  className="flex items-center gap-1.5 py-3"
                >
                  <Timer size={18} />
                  <span>Expiring Services</span>
                </Link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link
            href={href}
            className="block rounded-lg p-3 transition-colors hover:bg-gray-50"
          >
            <div className="flex flex-col gap-1 text-sm">
              <div className="font-semibold leading-none text-gray-900">
                {title}
              </div>

              <div className="text-xs text-muted-foreground">{children}</div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
