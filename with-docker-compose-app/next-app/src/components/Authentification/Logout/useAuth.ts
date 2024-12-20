import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Vérification de la session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/verifySession", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la session :", error);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        router.push("/auth/connexion");
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return { isLoggedIn, handleLogout };
}
