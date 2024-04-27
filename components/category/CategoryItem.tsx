import Image from "next/image";
import Link from "next/link";

export default function CategoryItem({ name }: { name: string }) {
  const href = name.toLowerCase();

  return (
    <Link
      href={`/search/category/${href}`}
      className="w-36 h-52 rounded-lg p-4 flex flex-col items-center justify-center gap-2"
    >
      <div className="w-full h-2/3 relative">
        <Image alt="category image" src="/images/category/mobile.png" fill />
      </div>
      <h2 className="text-xs font-semibold text-center">{name}</h2>
    </Link>
  );
}
