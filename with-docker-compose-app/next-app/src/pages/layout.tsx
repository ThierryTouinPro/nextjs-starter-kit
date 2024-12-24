import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <>
      {!router.pathname.includes("/admin/logs") && <Header />}
      {children}
      {!router.pathname.includes("/admin/logs") && <Footer />}
    </>
  );
}
