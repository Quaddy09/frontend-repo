import { NextApiResponse } from "next";
import { authenticate, AuthenticatedRequest } from "@/middleware/auth";

export default async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  const isAuthenticated = await authenticate(req, res);
  if (!isAuthenticated) return;

  // Protected route logic (Only authenticated users can access this)
  res.status(200).json({ message: "Protected data accessed", user: req.user });
}
