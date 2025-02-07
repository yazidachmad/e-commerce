"use client";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    // Clear user session or token here
    // For example, if using localStorage:
    localStorage.removeItem("userToken"); // Adjust based on your auth implementation

    // Redirect to the login page or home page
    router.push("/login"); // Redirect to login page
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-30 bg-white shadow">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/log-logo.png"
          alt=""
          width={100}
          height={100}
          className="w-8"
        />
        <span className="text-2xl font-bold font-teko">{Config.appName()}</span>
      </Link>
      <nav className="text-3xl flex items-center gap-3">
        <Link href="/search">
          <GoSearch />
        </Link>
        <Link href="/cart">
          <GiShoppingCart />
        </Link>
        <button onClick={toggleMenu}>
          <FiUser />
        </button>
      </nav>
      <div
        className={`absolute flex flex-col gap-2 bg-white shadow top-20 right-4 py-4 min-w-40 rounded-md transition-all duration-300 ease-in-out origin-top-right ${open ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      >
        <Link href="/login" className="py-2 px-4 hover:bg-gray-100 text-start">
          Login
        </Link>
        <Link href="/register" className="py-2 px-4 hover:bg-gray-100 text-start">
          Register
        </Link>
        <Link href="/profile" className="py-2 px-4 hover:bg-gray-100 text-start">
          Profile
        </Link>
        <Link href="/order" className="py-2 px-4 hover:bg-gray-100 text-start">
          Order
        </Link>
        <button
          type="button"
          onClick={handleLogout} // Call handleLogout on click
          className="py-2 px-4 hover:bg-gray-100 text-start"
        >
          Logout
        </button>
      </div>
    </header>
  );
}