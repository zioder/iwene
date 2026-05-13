"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/(admin)/admin/actions";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/projets", label: "Projets" },
  { href: "/admin/actualites", label: "Nos Actualités" },
  { href: "/admin/pages", label: "Pages" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="font-bold text-lg">
              Admin
            </Link>
            <div className="flex gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-muted-foreground hover:text-red-600 transition-colors"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
