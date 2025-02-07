import Image from "next/image";
import LoginForm from "./_partials/loginForm";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex h-screen">
      <LoginForm />

      <Image
        src="/log-img.jpeg"
        alt="Login"
        width={2000}
        height={500}
        className=" hidden md:block w-1/2 object-cover"
      />
    </div>
  );
}
