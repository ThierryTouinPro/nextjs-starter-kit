import AuthForm from '../../components/Authentification/AuthForm';

function AuthPage() {
  return (
    <div className="container" id="auth">
        <h1 className="text-center text-dark pt-5">
            Inscription
        </h1> 
        <a href="/login" className="text-center text-dark pt-2 d-block">
           <u>Si vous avez déjà un compte, veuillez vous connecter</u> 
        </a>
        <AuthForm />
    </div>
  );
}

export default AuthPage;
