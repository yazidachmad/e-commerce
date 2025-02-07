import { formatCurrency } from "@/core/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function ProductCard({
  href,
  image,
  category,
  name,
  rating,
  price,
}) {
  return (
    <Link
      href={href}
      className=" flex flex-col gap-4 bg-white   text-black p-3 min-w-80"
    >
      <Image
        src={image}
        alt={name}
        width={750}
        height={1000}
        className="w-full aspect-[3/4] object-cover"
      />
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold bg-dark/10 py-1 px-3 rounded-lg w-fit">
          {category}
        </p>
        <h3 className="text-2xl font-bold">{name}</h3>
        {rating && (
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            {rating}
          </div>
        )}

        <p className="text-lg font-semibold">{formatCurrency(price)}</p>
      </div>
    </Link>
  );
}
