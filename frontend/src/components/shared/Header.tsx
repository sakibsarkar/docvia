"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks";
import { navlinks } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const pathName = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex h-16 shrink-0 items-center gap-[10px]">
          <Image
            width={32}
            height={32}
            alt="Your Company"
            src="/images/logo.png"
            className="h-8 w-auto"
          />
          <span className="text-foreground">DOCVIA</span>
        </Link>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden items-center gap-6 md:flex">
          {navlinks.map((link, idx) => {
            const { name, href, ...rest } = link;
            return (
              <Link
                key={idx + "main_link"}
                href={href}
                {...rest}
                className={`text-sm ${
                  pathName === link.href ? "text-primary" : "text-muted-foreground"
                } transition-colors hover:text-foreground`}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link href={"/dashboard"}>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href={"/login"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Login
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
