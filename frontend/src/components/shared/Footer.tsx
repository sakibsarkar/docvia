import { Separator } from "@/components/ui/separator";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/50 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex h-16 shrink-0 items-center gap-[10px]">
              <Image
                width={32}
                height={32}
                alt="Docvia"
                src="/images/logo.png"
                className="h-8 w-auto"
              />
              <span className="text-foreground">DOCVIA</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Build AI chatbots that understand your business.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="transition-colors hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition-colors hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.npmjs.com/package/docvia"
                  className="transition-colors hover:text-primary"
                >
                  Dcoumentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
              Connect
            </h4>
            <div className="flex gap-3">
              <Link
                target="_blank"
                href="https://github.com/sakibsarkar/docvia-npm"
                className="hover:glow-cyan flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/sakib98/"
                className="hover:glow-cyan flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="mb-8 bg-border/40" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between text-sm text-muted-foreground md:flex-row">
          <p>&copy; 2025 Docvia. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link href="/privacy-policy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
