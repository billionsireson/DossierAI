import Logo from "@/components/brand/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink-soft">
          <a href="/" className="text-ink font-semibold">Home</a>
          <a href="/search" className="hover:text-ink">Browse</a>
          <a href="/request/new" className="hover:text-ink">Request custom</a>
          <a href="/business/b1" className="hover:text-ink">Businesses</a>
          <a href="/saved" className="hover:text-ink">Saved</a>
          <a href="/compare" className="hover:text-ink">Compare</a>
          <a href="/messages" className="hover:text-ink">Messages</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a
            href="/search"
            className="hidden sm:grid w-9 h-9 place-items-center rounded-full hover:bg-mist-light"
            aria-label="Search"
          >
            🔍
          </a>
          <a
            href="/request/new"
            className="hidden sm:inline-flex text-sm font-semibold px-4 py-2 rounded-full bg-ink text-white hover:bg-black"
          >
            For business
          </a>
          <a
            href="/search"
            className="inline-flex text-sm font-semibold px-4 py-2 rounded-full bg-burgundy text-white hover:bg-burgundy-dark"
          >
            Find furniture
          </a>
        </div>
      </div>
    </header>
  );
}
