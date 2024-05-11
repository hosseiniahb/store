import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PaymentMessage({
  statusPayment,
}: {
  statusPayment: "FAILED" | "SUCCESS";
}) {
  return (
    <div
      className={cn("w-full h-screen flex items-center justify-center", {
        "bg-green-500": statusPayment === "SUCCESS",
        "bg-red-600": statusPayment === "FAILED",
      })}
    >
      <div className="w-11/12 md:w-6/12 lg:w-4/12 h-4/6 bg-accent rounded-lg flex flex-col items-center justify-center gap-5">
        <Image
          src={
            statusPayment === "FAILED"
              ? "/images/message/triangle-alert.svg"
              : "/images/message/circle-check.svg"
          }
          width={220}
          height={220}
          alt="message picture"
          priority
          className="object-cover"
        />
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <p className="font-semibold text-accept text-center">
            {statusPayment === "FAILED"
              ? "Unfortunately, your payment was not successful."
              : "Your payment has been successfully completed."}
          </p>
          <Link
            href={
              statusPayment === "FAILED"
                ? process.env.SITE_URL || "/"
                : `${process.env.SITE_URL || "/"}/profile/orders`
            }
          >
            <Button
              variant={statusPayment === "FAILED" ? "destructive" : "default"}
            >
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
