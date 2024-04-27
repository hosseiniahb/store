import { cn } from "@/lib/utils";
import Image from "next/image";

type BannerProps = {
  title: string;
  imageUrl: string;
  textColor: string;
  bgColor: string;
};

export default function Banner({
  title,
  imageUrl,
  textColor,
  bgColor,
}: BannerProps) {
  return (
    <div
      className={cn(
        "w-96 h-64 flex items-center justify-center p-2 rounded-xl gap-5",
        bgColor
      )}
    >
      <div className="w-1/3 h-full flex items-center justify-center">
        <h3 className={cn("font-semibold text-2xl", textColor)}>{title}</h3>
      </div>
      <div className="w-280 h-56 relative">
        <Image alt={title} src={imageUrl!} fill />
      </div>
    </div>
  );
}
