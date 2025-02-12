import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Container from "@/components/Container/Container";
import RootLayout from "@/pages/layout";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "../../i18n";
import { AuthProvider } from "@/components/Authentification/Logout/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Container>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </Container>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
