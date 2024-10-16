import { useState } from 'react';
import ButtonSubmit from '../Interface/ButtonSubmit';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // Pour stocker les erreurs

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({}); // Réinitialiser les erreurs avant de soumettre le formulaire

    try {
      const response = await fetch('/api/auth/register', {
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
        
          // Gérer les différentes erreurs en fonction du statut HTTP
          if (response.status === 400) {
            // Erreur de validation, par exemple : email ou mot de passe manquants ou invalides
            errorMessage = errorData.error || 'Données invalides, veuillez vérifier vos informations.';
          } else if (response.status === 401) {
            // Utilisateur non autorisé, si applicable
            errorMessage = errorData.error || 'Accès non autorisé.';
          } else if (response.status === 500) {
            // Erreur serveur
            errorMessage = 'Erreur serveur, veuillez réessayer plus tard.';
          } else {
            // Erreur générique si le type d'erreur n'est pas spécifié
            errorMessage = errorData.error || 'Une erreur est survenue.';
          }
        } catch (e) {
          // Gérer les cas où la réponse n'est pas un JSON valide ou si quelque chose ne va pas
          errorMessage = 'Une erreur inattendue est survenue. Veuillez réessayer.';
        }
        
      
        // Définir les erreurs dans l'état
        setErrors({ global: errorMessage });
        return;
      }

      const data = await response.json();
      console.log('User registered successfully:', data);
      // Rediriger l'utilisateur après l'inscription
      window.location.href = '/OKK!!!!!';
    } catch (error) {
      console.error('Error during registration:', error);
      setErrors({ global: 'Internal Server Error' });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form id="auth-form" onSubmit={handleRegister}>
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
            <ButtonSubmit type="submit" label="S'incrire" mode="secondary" />
          </div>
        </form>
      </div>
    </div>
  );
}
