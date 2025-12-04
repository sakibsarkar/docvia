import Link from "next/link";

const Header = () => {
  return (
    <header className="wrapper py-4">
      <nav className="sticky flex items-center justify-between rounded-4xl border border-gray-300 bg-white px-5 py-3">
        {/* logo */}
        <Link className="text-[18px] font-semibold" href="/">
          Logo
        </Link>

        {/* header link */}
        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-3xl bg-gray-100 px-5 py-2 text-gray-500">
            Login
          </Link>
          <Link
            href="/dashboard"
            className="rounded-3xl bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
