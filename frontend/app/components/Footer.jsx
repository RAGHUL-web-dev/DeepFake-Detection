import Link from "next/link";

function Footer() {
  return (
    <footer className="w-screen h-screen bg-light-gray flex flex-col justify-between">
      
      {/* TOP CONTENT */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* LEFT TEXT */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-medium text-black">
              Experience liftoff
            </h2>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-black">Product</h3>
            <ul className="space-y-3 text-sm text-black/70">
              <li><Link href="#">Download</Link></li>
              <li><Link href="#">Docs</Link></li>
              <li><Link href="#">Changelog</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-sm font-medium mb-4 text-black">Resources</h3>
            <ul className="space-y-3 text-sm text-black/70">
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Pricing</Link></li>
              <li><Link href="#">Use Cases</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* HUGE BRAND TEXT */}
      <div className="w-full px-4">
        <h1 className="text-[18vw] leading-none font-bold tracking-tight text-black text-center select-none">
          DeepShield
        </h1>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-black/60">
          <span>Deep Shield</span>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-black transition">About</Link>
            <Link href="#" className="hover:text-black transition">Products</Link>
            <Link href="#" className="hover:text-black transition">Privacy</Link>
            <Link href="#" className="hover:text-black transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
