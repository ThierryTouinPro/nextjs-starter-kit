import { deleteSession } from "@/backend/dao/sessionDao";
import logger from "@/config/winston";

export async function processLogout(sessionCookie: string) {
  try {
    // Parse le cookie pour obtenir les informations de session
    const session = JSON.parse(sessionCookie);

    if (!session || !session.sessionId) {
      logger.warn("Session ID manquant dans le cookie");
      return { success: false, error: "No session ID found in cookie" };
    }

    const { sessionId } = session;

    // Supprimer la session dans le backend
    deleteSession(sessionId);
    logger.info(`Session ${sessionId} supprimée avec succès`);

    return { success: true };
  } catch (error: any) {
    logger.error("Erreur lors de la suppression de la session :", {
      message: error.message,
      stack: error.stack,
    });
    return { success: false, error: "Failed to process logout" };
  }
}
