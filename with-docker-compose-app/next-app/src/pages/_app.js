import Container from "../components/Container/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp;