import Link from "next/link";

function Page404(): JSX.Element {
  return (
    <div className="text-center d-flex flex-column align-items-center justify-content-center vh-100 404Page">
      <h1 className="display-1">404</h1>
      <h2 className="mb-5">Page non trouvée</h2>
      <p>
        Nous sommes désolés, la page que vous recherchez n'existe pas.
      </p> 
      <p>
        Allez peut-être sur notre{" "}
        <Link href="/" className="link-info link-offset-2 link-underline-opacity-10 link-underline-opacity-100-hover">
          page d'accueil
        </Link>
      </p>
    </div>
  );
}

export default Page404;
