"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_LINKS = [
  { href: "/landing#how-it-works", label: "How It Works" },
  { href: "/landing#services", label: "Services" },
  { href: "/ai", label: "AI Style" },
  { href: "/orders/track", label: "Track Order" },
];

function ThreadlyLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/landing" className={`flex items-center gap-2.5 group ${className}`} aria-label="Threadly Home">
      {/* SVG Logo Mark — needle + thread path forming T */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        <rect width="32" height="32" rx="8" fill="var(--primary)" opacity="0.15"/>
        {/* Needle body */}
        <path d="M8 24 L20 8" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/>
        {/* Needle eye */}
        <ellipse cx="20.5" cy="7.5" rx="2" ry="2" stroke="var(--primary)" strokeWidth="1.5" fill="none"/>
        {/* Thread path */}
        <path d="M20 8 C22 12, 24 14, 22 18 C20 22, 16 22, 16 26" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
        {/* Pin dot */}
        <circle cx="8" cy="24" r="2" fill="var(--primary)"/>
      </svg>
      <span
        className="font-display font-black text-xl tracking-tight"
        style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
      >
        THREADLY
      </span>
    </Link>
  );
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const options: Array<{ value: "light" | "dark" | "system"; icon: string }> = [
    { value: "light", icon: "☀️" },
    { value: "dark", icon: "🌙" },
    { value: "system", icon: "⚙️" },
  ];

  return (
    <div className="flex items-center p-1 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all"
          style={{
            background: theme === opt.value ? "var(--primary-soft)" : "transparent",
            color: theme === opt.value ? "var(--primary)" : "var(--foreground-muted)",
          }}
          aria-label={`Set ${opt.value} theme`}
          title={`${opt.value} mode`}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation">
        <ThreadlyLogo />

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                color: "var(--foreground-muted)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--foreground-muted)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ color: "var(--foreground-muted)", border: "1px solid var(--border)" }}
          >
            <span>👤</span>
            <span>Dashboard</span>
          </Link>
          <Link href="/book" className="btn btn-primary btn-sm">
            Book a Tailor
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn btn-ghost btn-icon"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--foreground)">
              {mobileOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-[60px] left-0 right-0 animate-fade-in-down"
            style={{
              background: "var(--surface)",
              borderBottom: "1px solid var(--border)",
              padding: "16px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-medium"
                  style={{ color: "var(--foreground)", background: "var(--background)" }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px my-1" style={{ background: "var(--border)" }} />
              <Link
                href="/dashboard"
                className="px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2"
                style={{ color: "var(--foreground)", background: "var(--background)" }}
              >
                <span>👤</span> My Dashboard
              </Link>
              <Link href="/book" className="btn btn-primary mt-2 w-full justify-center">
                Book a Tailor
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
