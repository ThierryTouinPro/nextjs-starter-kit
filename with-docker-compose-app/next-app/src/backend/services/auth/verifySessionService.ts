export function validateSession(sessionCookie: string) {
  try {
    const session = JSON.parse(sessionCookie);

    if (!session) {
      return { isValid: false, error: "Session ID manquant" };
    }

    const { sessionId, userId, expiresAt } = session;

    if (!sessionId || !userId) {
      return { isValid: false, error: "Session invalide ou corrompue" };
    }

    if (Date.now() > expiresAt) {
      return { isValid: false, error: "Session invalide ou expirée." };
    }

    return { isValid: true, session };
  } catch (error) {
    console.error("Erreur lors de l'analyse du cookie de session:", error);
    return { isValid: false, error: "Erreur d'analyse du cookie de session" };
  }
}
