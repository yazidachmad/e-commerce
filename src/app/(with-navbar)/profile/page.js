"use client";

import { useState } from "react";
import { useAuth } from "@/core/useAuth";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSave, FaEdit, FaCheckCircle } from "react-icons/fa";

export default function EditProfile() {
  const user = useAuth();
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    
    setShowSuccess(true); 
    setTimeout(() => {
      setShowSuccess(false); 
    }, 3000);
    router.push("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="p-6 bg-white shadow-lg rounded-xl w-full max-w-lg text-center relative">
        <button
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-900"
          onClick={() => router.push("/profile")}
        >
          <FaArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Profil</h1>
        
        <div className="flex justify-center mb-6 relative">
          <img
            src={avatar || "/profile.png"}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full border-4 border-indigo-600 shadow-md"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border-2 border-indigo-600 shadow-md hover:bg-indigo-600 hover:text-white transition">
            <FaEdit size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <button
            className="mt-6 w-full flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            onClick={handleSave}
          >
            <FaSave className="mr-2" /> Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Notifikasi Sukses */}
      {showSuccess && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3">
          <FaCheckCircle size={20} />
          <span className="text-lg font-semibold">Edit Berhasil</span>
        </div>
      )}
    </div>
  );
}