import Link from "next/link";
import GeoLocation from "@/app/components/GeoLocation";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 mt-20">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} forawesonga · Built with Next.js
          </p>
          <div className="mt-1">
            <GeoLocation />
          </div>
        </div>
        <div className="flex items-center gap-5 text-sm text-neutral-500">
          <Link href="/about" className="hover:text-neutral-200 transition-colors">About</Link>
          <a href="https://github.com" target="_blank" rel="noopener" className="hover:text-neutral-200 transition-colors">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener" className="hover:text-neutral-200 transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}