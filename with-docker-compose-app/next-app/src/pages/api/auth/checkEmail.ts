import { emailHandler } from "@/backend/handlers/auth/emailHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return emailHandler(req, res);
}
