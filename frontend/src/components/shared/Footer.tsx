import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-10">
      <div className="wrapper flex flex-col items-center justify-between gap-4 pb-6 md:flex-row">
        {/* Copyright */}
        <Link href="/" className="text-lg font-semibold">
          Logo
        </Link>

        {/* Links */}
        <ul className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
          <li>
            <Link href="/privacy" className="transition-colors hover:text-blue-500 hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="transition-colors hover:text-blue-500 hover:underline">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link
              href="mailto:support@yourcompany.com"
              className="transition-colors hover:text-blue-500 hover:underline"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>{" "}
      {/* copyright */}
      <p className="text-center font-poppins text-sm text-gray-500">
        © Copyright {new Date().getFullYear()}. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
