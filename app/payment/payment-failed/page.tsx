import PaymentMessage from "@/components/stripe/PaymentMessage";

export default function PaymentFailedPage() {
  return <PaymentMessage statusPayment="FAILED" />;
}
