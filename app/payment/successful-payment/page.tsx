import PaymentMessage from "@/components/stripe/PaymentMessage";

export default function SuccessfulPaymentPage() {
  return <PaymentMessage statusPayment="SUCCESS" />;
}
