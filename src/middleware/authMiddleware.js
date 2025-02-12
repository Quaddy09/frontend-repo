import { getAuth } from "firebase/auth";

const fetchProtectedData = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (user) {
    const token = await user.getIdToken(); // Get Firebase Auth token
    const response = await fetch("/api/protected-route", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log(data);
  } else {
    console.log("User not authenticated");
  }
};

fetchProtectedData();
