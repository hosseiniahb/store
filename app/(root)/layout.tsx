import Footer from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-[90vh] px-3">{children}</main>
      <Footer />
    </>
  );
}
