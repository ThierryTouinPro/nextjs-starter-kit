import { getUserProfileHandler } from "@/backend/handlers/user/getUserProfileHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return getUserProfileHandler(req, res);
}
