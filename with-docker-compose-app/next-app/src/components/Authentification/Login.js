import { useState } from 'react';
import ButtonSubmit from '../Interface/ButtonSubmit';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // Pour stocker les erreurs

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({}); // Réinitialiser les erreurs avant de soumettre le formulaire

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      if (!response.ok) {
        let errorMessage = 'An error occurred';
      
        try {
          const errorData = await response.json();
        
          if (response.status === 400) {
            errorMessage = errorData.error || 'Données invalides, veuillez vérifier vos informations.';
          } else if (response.status === 401) {
            errorMessage = errorData.error || 'Accès non autorisé.';
          } else if (response.status === 500) {
            errorMessage = 'Erreur serveur, veuillez réessayer plus tard.';
          } else {
            errorMessage = errorData.error || 'Une erreur est survenue.';
          }
        } catch (e) {
          console.error('Error parsing JSON response:', e);
          errorMessage = 'Une erreur inattendue est survenue. Veuillez réessayer.';
        }
      
        setErrors({ global: errorMessage });
        return;
      }
    
      const data = await response.json();
      console.log('User logged in successfully:', data);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during login:', error);
      setErrors({ global: 'Internal Server Error' });
    }
    
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form id="auth-form" onSubmit={handleLogin}>
          <div>
            <img src="/images/auth-icon.png" alt="A lock icon" />
          </div>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </p>
          <div className='text-center'>
            <p className='my-4'>
              {errors.global && <p className="error-message">{errors.global}</p>}
            </p>
            <ButtonSubmit type="submit" label="Se connecter" mode="secondary" />
          </div>
        </form>
      </div>
    </div>
  );
}
