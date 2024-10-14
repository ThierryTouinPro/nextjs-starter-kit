import Container from "../components/Container/Container";
import Layout from "./layout"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Container>
    
  );
}

export default MyApp;