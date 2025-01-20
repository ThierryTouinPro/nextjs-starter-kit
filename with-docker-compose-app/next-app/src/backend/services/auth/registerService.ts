import { createSession } from "@/backend/dao/sessionDao";
import { createUser, getUserByEmail } from "@/backend/dao/userDao";
import logger from "@/config/winston";
import { serialize } from "cookie";

/**
 * Traite l'enregistrement de l'utilisateur.
 */
export async function processUserRegistration({
  email,
  password,
  firstName,
  lastName,
  phone,
  birthDate,
  gender,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  gender: string;
}) {
  // Vérifier si l'utilisateur existe déjà
  const existingUser = await getUserByEmail(email);
  logger.info(
    "Vérification de l'utilisateur existant dans la base de données pour l'email :",
    email
  );
  console.log("Vérification de l'utilisateur existant :", email);
  console.log("Utilisateur trouvé :", existingUser);

  if (existingUser) {
    logger.warn(
      `Tentative d'enregistrement avec un email déjà utilisé : ${email}`
    );
    throw new Error("L'utilisateur existe déjà");
  }

  // Vérification et formatage de la date de naissance
  const birthDateObj = new Date(birthDate);
  if (isNaN(birthDateObj.getTime())) {
    throw new Error("Date de naissance invalide");
  }
  const formattedBirthDate = `${birthDateObj.getFullYear()}-${String(
    birthDateObj.getMonth() + 1
  ).padStart(2, "0")}-${String(birthDateObj.getDate()).padStart(2, "0")}`;

  // Insérer l'utilisateur dans la base de données
  const userId = await createUser(
    email,
    password,
    firstName,
    lastName,
    formattedBirthDate,
    phone,
    gender
  );
  logger.info("Utilisateur inséré avec succès :", { userId });
  console.log("Utilisateur inséré :", userId);

  // Créer automatiquement une session pour l'utilisateur
  const { sessionId, expiresAt } = await createSession(userId);

  const sessionCookie = serialize(
    "session",
    JSON.stringify({ sessionId, userId, expiresAt }),
    {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 24 heures
      path: "/", // Nécessaire pour toutes les routes
      sameSite: "lax", // Utile pour les sessions
      secure: process.env.NODE_ENV === "production",
    }
  );
  console.log("Cookie défini :", sessionCookie);

  return {
    message: "User registered successfully",
    sessionCookie,
    expiresAt,
  };
}
