import Image from "next/image";
import RegisterForm from "./_partials/registerForm";

export const metadata = {
  title: "register",
};

export default function Register() {
  return (
      <div className="flex h-screen">
          <RegisterForm />

      <Image
        src="/reg-img.jpeg"
        alt="Register"
        width={2000}
        height={500}
        className=" hidden md:block w-1/2 object-cover"
      />
    </div>
  );
}
