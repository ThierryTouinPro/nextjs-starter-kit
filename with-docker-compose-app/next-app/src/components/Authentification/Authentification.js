import Link from 'next/link';
import Buttons from '../Interface/Buttons';

export default function AuthForm() {
  return (
    <div className="row justify-content-center">
        <div className="col-md-6">
            <form id="auth-form">
                <div>
                    <img src="/images/auth-icon.png" alt="A lock icon" />
                </div>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </p>
                <div>
                    <div className="mb-4">
                        <Buttons label="Création du compte" mode="secondary" href="/" />
                    </div>
                    <Link href="/">Se connecter avec un compte existant.</Link>
                </div>
            </form>
        </div>
    </div>
  );
}