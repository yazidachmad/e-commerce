import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ name, image, href }) {
    return (
        <Link href={href} className="aspect-[4/5] relative group">
                <Image src={image} alt={name} width={400} height={500} className="size-full object-cover"></Image>
                <div className="absolute top-0 left-0 bg-dark/50 inset-0 text-center place-content-center text-white font-medium text-lg uppercase p-3 opacity-0 group-hover:opacity-100 transition duration-300">{name}
                </div>
      </Link>

    );
    
}