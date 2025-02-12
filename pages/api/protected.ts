import { NextApiResponse } from "next";
import { authenticate, AuthenticatedRequest } from "@/middleware/auth";

export default async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  const isAuthenticated = await authenticate(req, res);
  if (!isAuthenticated) return;

  return res.status(200).json({ message: "Protected data", user: req.user });
}
