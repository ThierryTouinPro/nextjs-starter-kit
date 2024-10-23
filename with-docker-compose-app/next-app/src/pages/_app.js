import Container from "../components/Container/Container";
import RootLayout from "./layout";
import ErrorBoundary from '../components/Error/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Container>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </Container>
    </ErrorBoundary>
  );
}

export default MyApp;