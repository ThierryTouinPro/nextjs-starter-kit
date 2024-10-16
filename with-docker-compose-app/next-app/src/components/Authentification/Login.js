import { useState } from 'react';

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
      console.log('User logged in successfully:', data);
      // Rediriger l'utilisateur après la connexion
      window.location.href = '/training';
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
          <button type="submit">Se connecter</button>
          {errors.global && <p className="error">{errors.global}</p>}
        </form>
      </div>
    </div>
  );
}
