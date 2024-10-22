import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="container" id="auth">
      <h1>Bienvenue sur la page d'authentification</h1>
      <div className="navigation">
        <Link href="/auth/registration">
          <a>Go to Registration</a>
        </Link>
        <Link href="/auth/connexion">
          <a>Go to Connexion</a>
        </Link>
      </div>
    </div>
  );
}
