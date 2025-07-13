"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Top Up",
      href: "/topup",
    },
    {
      name: "Transaction",
      href: "/transaction",
    },
    {
      name: "Akun",
      href: "/akun",
    },
  ];

  return (
    <header className="border-b border-gray-200 p-4 px-0">
      <nav className="mx-auto flex items-center justify-between gap-4 px-24">
        {/* Home */}
        <Link href="/" className="flex items-center gap-2 text-lg font-medium">
          <img src={siteConfig.logo} alt="" draggable={false} />
          {siteConfig.name}
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(pathname === link.href && "text-red-500")}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
