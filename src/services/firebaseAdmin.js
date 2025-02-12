import admin from "firebase-admin";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";

dotenv.config();

// Load Firebase credentials from the JSON file
const serviceAccountPath = path.join(process.cwd(), "src/config/firebaseConfig.json");

if (!serviceAccountPath) {
  console.error("❌ Firebase config file is missing!");
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export { admin, db };
