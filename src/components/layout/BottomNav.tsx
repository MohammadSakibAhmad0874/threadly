"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, PlusCircle, Compass, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/landing", label: "Home", icon: Home },
    { href: "/dashboard", label: "Orders", icon: Compass },
    { href: "/book", label: "Book", icon: PlusCircle, highlight: true },
    { href: "/ai", label: "Style AI", icon: Sparkles },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface-primary)]/90 backdrop-blur-lg border-t border-[var(--border-subtle)] px-2 py-1.5 pb-safe shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/landing"
              ? pathname === "/" || pathname === "/landing"
              : pathname.startsWith(item.href);

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--primary)]/30 group-active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-medium text-[var(--primary)] mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
                isActive
                  ? "text-[var(--primary)] font-semibold"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
