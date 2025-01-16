import { NextApiRequest, NextApiResponse } from "next";
import { processUserRegistration } from "@/backend/services/auth/registerService";
import logger from "@/config/winston";

export async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    logger.warn(`Méthode ${req.method} non autorisée pour cette route`);
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, firstName, lastName, phone, birthDate, gender } =
    req.body;

  logger.info("Requête reçue :", { method: req.method, body: req.body });
  console.log("Requête reçue :", { method: req.method, body: req.body });

  // Vérification des champs
  if (
    !email?.trim() ||
    !password?.trim() ||
    !firstName?.trim() ||
    !lastName?.trim() ||
    !phone?.trim() ||
    !birthDate?.trim() ||
    !gender?.trim()
  ) {
    logger.warn("Tentative d'enregistrement avec un champ vide");
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
    const responsePayload = await processUserRegistration({
      email,
      password,
      firstName,
      lastName,
      phone,
      birthDate,
      gender,
    });

    // Extrait et inclut le cookie dans le header de réponse
    const { sessionCookie, ...payloadWithoutCookie } = responsePayload;

    if (sessionCookie) {
      res.setHeader("Set-Cookie", sessionCookie);
      logger.info("Session cookie défini :", sessionCookie);
      console.log("Session cookie défini :", sessionCookie);
    }

    logger.info("Données envoyées au client :", payloadWithoutCookie);
    console.log("Données envoyées au client :", payloadWithoutCookie);

    return res.status(201).json(responsePayload);
  } catch (error: any) {
    logger.error("Erreur lors de l'enregistrement de l'utilisateur :", {
      message: error.message,
      stack: error.stack,
    });
    console.log(
      "Erreur lors de l'enregistrement :",
      error.message,
      error.stack
    );
    return res
      .status(500)
      .json({ errors: { global: "Erreur serveur interne" } });
  }
}
