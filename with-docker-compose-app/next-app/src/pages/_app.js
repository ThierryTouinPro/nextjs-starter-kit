import Container from "../components/Container/Container";
import RootLayout from "./layout"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Container>
    
  );
}

export default MyApp;