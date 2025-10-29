"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t border-gray-200 text-gray-400">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Name */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800">Pomegrid</span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Pomegrid. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="hover:text-green-500 transition"
          >
            <Facebook size={18} />
          </Link>
          <Link
            href="https://x.com"
            target="_blank"
            className="hover:text-green-500 transition"
          >
            <Twitter size={18} />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-green-500 transition"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="hover:text-green-500 transition"
          >
            <Instagram size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
