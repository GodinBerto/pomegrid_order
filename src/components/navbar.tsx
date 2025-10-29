"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-700">
            Pome<span className="text-orange-500">grid</span>
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Sign Up Button */}
          <Link
            href="/signup"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full font-medium transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
