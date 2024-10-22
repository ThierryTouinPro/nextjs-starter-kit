import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="container" id="auth">
      <h1>Bienvenue sur la page d'authentification</h1>
      <div className="navigation">
        <Link href="/auth/registration">
          Go to Registration
        </Link>
        <Link href="/auth/connexion">
          Go to Connexion
        </Link>
      </div>
    </div>
  );
}
