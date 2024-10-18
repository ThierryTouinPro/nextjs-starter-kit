import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
        {!router.pathname.includes('/admin/logs') && <Header />}
            {children}
        {!router.pathname.includes('/admin/logs') && <Footer />}
    </>
  )
}
