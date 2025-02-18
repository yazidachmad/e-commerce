"use client";
import Config from "@/core/config";
import { useAuth } from "@/core/useAuth";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { formatCurrency } from "@/core/helpers";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [selectedCart, setSelectedCart] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const user = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(Config.baseApiUrl() + "cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);
        setCartData(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  const deleteCart = async (cartId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(Config.baseApiUrl() + "cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartId }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success(result.message);
      setCartData(cartData.filter((item) => item.cart_id !== cartId));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleCart = (cartItem) => {
    setSelectedCart((prevCart) =>
      prevCart.some((cart) => cart.cartId === cartItem.cart_id)
        ? prevCart.filter((cart) => cart.cartId !== cartItem.cart_id)
        : [...prevCart, { ...cartItem }]
    );
  };

  const handleCheckout = () => {
    toast.success("Order placed successfully!", {
      position: "top-center",
      duration: 3000,
      style: { borderRadius: "8px", background: "#4CAF50", color: "#fff" },
    });
    setOrderedItems(selectedCart.map(item => item.cartId));
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Your Cart</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {cartData.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartData.map((item) => (
            <div key={item.cart_id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div
                onClick={() => toggleCart(item)}
                className={`w-6 h-6 flex items-center justify-center border rounded cursor-pointer transition ${
                  selectedCart.some((cart) => cart.cartId === item.cart_id)
                    ? "bg-green-500 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                {selectedCart.some((cart) => cart.cartId === item.cart_id) && <FaCheck />}
              </div>
              <Link href={`/product/${item.slug}`} className="flex flex-row gap-4 items-center w-full">
                <Image
                  src={Config.baseUrl() + item.img_urls[0]}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded border p-2 bg-white"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  {item.variant && <p className="text-sm text-gray-500">Variant: {item.variant}</p>}
                  <p className="text-sm font-semibold">{formatCurrency(item.price)}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="text-sm font-bold">Total: {formatCurrency(item.price * item.quantity)}</p>
                </div>
              </Link>
              <button
                onClick={() => deleteCart(item.cart_id)}
                className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-700 transition"
              >
                <BsTrash3 className="text-white text-lg" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-6 shadow-md flex items-center justify-between">
        <div>
          <p className="text-xl font-medium">Total :</p>
          <p className="text-3xl font-bold">
            {formatCurrency(
              selectedCart.reduce((total, item) => total + item.price * item.quantity, 0)
            )}
          </p>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
