import { verifySessionHandler } from "@/backend/handlers/auth/verifySessionHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return verifySessionHandler(req, res);
}
