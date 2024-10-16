import { useState } from 'react';

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
        const errorData = await response.json();
        setErrors(errorData.errors || { global: 'An error occurred' });
        return;
      }

      const data = await response.json();
      console.log('User registered successfully:', data);
      // Rediriger l'utilisateur après l'inscription
      window.location.href = '/training';
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
          <button type="submit">S'inscrire</button>
          {errors.global && <p className="error">{errors.global}</p>}
        </form>
      </div>
    </div>
  );
}
