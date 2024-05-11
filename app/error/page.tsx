import Image from "next/image";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-5/6 flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/error/warning.svg"
          width={300}
          height={300}
          alt="warning picture"
          className="object-cover object-center"
        />
        <h1 className="font-bold text-2xl text-center">
          Oops!
          <p className="text-lg mt-2">Sorry, something went wrong</p>
        </h1>
        <Link
          href="/"
          className="text-primary font-semibold transition-all hover:underline"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}
