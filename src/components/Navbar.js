"use client";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/core/useAuth";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    
    const toggleMenu = () => {
        setOpen(!open);
    };

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${searchQuery}`);
        }
    };

    const user = useAuth();

    return(
        <>
            <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-gray-700 shadow-md border-b border-gray-800 text-white">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logonya.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="w-50 h-50"
                    />
                    <span className="font-poppins text-2xl font-bold">{Config.appName()}</span>
                </Link>
                
                <form onSubmit={handleSearch} className="relative flex items-center w-1/3">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 rounded-full text-gray-900 focus:outline-none"
                    />
                    <button type="submit" className="absolute right-2 text-gray-600">
                        <FaSearch size={20} />
                    </button>
                </form>

                <nav className="text-2xl flex items-center gap-5">
                    <Link href="/cart" className="hover:text-yellow-300 transition-colors relative">
                        <FaShoppingCart />
                        <span className="absolute -top-2 -right-2 bg-white text-gray-700 text-xs font-bold rounded-full px-1.5 py-0.5">3</span>
                    </Link>
                    <button onClick={toggleMenu} className="hover:text-yellow-300 transition-colors">
                        <FaUser />
                    </button>
                </nav>

                {open && (
                    <div className="absolute flex flex-col gap-2 bg-white shadow-lg top-16 right-6 py-4 min-w-48 rounded-lg border border-gray-200 text-gray-800 animate-fade-in">
                        {user ? (
                            <>
                                <Link href="/profile" className="py-2 px-4 hover:bg-gray-100 text-start">Profile</Link>
                                <Link href="/order" className="py-2 px-4 hover:bg-gray-100 text-start">My Order</Link>
                                <button type="button" onClick={logout} className="py-2 px-4 hover:bg-red-100 text-red-600 text-start">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="py-2 px-4 hover:bg-gray-100 text-start">Login</Link>
                                <Link href="/register" className="py-2 px-4 hover:bg-gray-100 text-start">Register</Link>
                            </>
                        )}
                    </div>
                )}
            </header>
            
            {/* Deliver To Section */}
            <div className="bg-gray-200 text-gray-700 py-2 px-6 flex items-center gap-2 text-sm">
                <FaMapMarkerAlt className="text-red-500" />
                <span>Dikirim ke : <strong>Sidoarjo</strong></span>
            </div>
        </>
    );
}
