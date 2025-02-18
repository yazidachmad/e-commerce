"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosLogIn } from "react-icons/io";
import { useState } from "react";
import Config from "@/core/config";
import CostomInput from "@/components/CostomInput";
import FilledButton from "@/components/FilledButton";
import { FaEye, FaRegEyeSlash } from "react-icons/fa6";
import { LuCircleAlert } from "react-icons/lu";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [obscurePassword, setObscurePassword] = useState(true);
  const [obscurePass, setObsConfirmPass] = useState(true);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleObscurePassword = () => {
    setObscurePassword(!obscurePassword);
  };

  const toggleObsConfirmPassword = () => {
    setObsConfirmPass(!obscurePass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    try {
      // 
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords and confrim passwords doesn't match.");
      }

      const res = await fetch(Config.baseApiUrl() + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      localStorage.setItem("token", result.data.token);
      router.push("/");
  
    } catch (error) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className=" w-full md:w-1/2 flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src="/log-logo.png" alt="" width={150} height={150} />
        <span className="text-2xl font-bold font-teko">{Config.appName()}</span>
      </Link>
      <div className="h-px w-1/2 bg-dark/35"></div>
      <h1 className="text-2xl font-bold">Register</h1>
      {errors && (
        <div className="flex items-center gap-2 text-red-500 bg-red-500/20 py-2 px-4 rounded text-sm border border-red-500 w-2/3 mb-2">
          <LuCircleAlert className="shrink-0 text-l" />
          {errors}
        </div>
      )}

      <CostomInput
        id="name"
        name="name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        value={formData.name}
        placeholder="Enter your name"
        required={true}
        className={"w-2/3"}
      ></CostomInput>
      <CostomInput
        type="email"
        id="email"
        name="email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        value={formData.email}
        placeholder="Enter your email"
        required={true}
        className={"w-2/3"}
      />
      <div className="w-2/3 relative">
        <CostomInput
          type={obscurePassword ? "password" : "text"}
          id="password"
          name="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
          placeholder="Enter your password"
          required={true}
          className={"w-full"}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2 "
          onClick={toggleObscurePassword}
        >
          {" "}
          {obscurePassword ? <FaEye /> : <FaRegEyeSlash />}
        </button>
      </div>
      <div className="w-2/3 relative">
        <CostomInput
          type={obscurePass ? "password" : "text"}
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          value={formData.confirmPassword}
          placeholder="Confirm password"
          required={true}
          className={"w-full"}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2 "
          onClick={toggleObsConfirmPassword}
        >
          {" "}
          {obscurePass ? <FaEye /> : <FaRegEyeSlash />}
        </button>
      </div>
      <FilledButton
        type="submit"
        className={"w-2/3 bg-opacity-70"}
        disabled={loading}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        ) : (
          <IoIosLogIn className="text-2xl " />
        )}
      </FilledButton>
      <p className="text-sm">
        Don{"'"} t have an account?{""}
        <Link href="/login" className="= font-semibold hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}


