import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";

// Define an interface for the request with a user property
export interface AuthenticatedRequest extends NextApiRequest {
  user?: admin.auth.DecodedIdToken;
}

// Ensure Firebase Admin is initialized only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// Authentication Middleware
export const authenticate = async (
  req: AuthenticatedRequest, // Use the extended request type
  res: NextApiResponse
): Promise<boolean> => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized: No Token Provided" });
      return false;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user to request
    return true;
  } catch (error) {
    console.error("Authentication Error:", error); // Log error for debugging
    res.status(401).json({ error: "Invalid Token" });
    return false;
  }
};
