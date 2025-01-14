import { logoutHandler } from "@/handlers/auth/logoutHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return logoutHandler(req, res);
}
