import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Container from "components/Container/Container";
import RootLayout from "./layout";
import ErrorBoundary from 'components/Error/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";
import '../../i18n';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Container>
        <RootLayout>
          <Head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css" />
          </Head>
          <Component {...pageProps} />
        </RootLayout>
      </Container>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp);
