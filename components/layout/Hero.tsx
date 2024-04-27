import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full h-[87vh] flex flex-col items-center justify-center gap-7 p-4">
      <h1 className="w-full md:w-8/12 text-5xl sm:text-7xl font-semibold text-center dark:drop-shadow-[2px_2px_100px_var(--tw-shadow-color)] dark:shadow-primary">
        The best shopping experience
      </h1>
      <div className="flex items-center justify-center gap-5">
        <Link href="/search">
          <Button>View Shop</Button>
        </Link>
      </div>
    </section>
  );
}
