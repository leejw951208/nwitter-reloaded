import { Navigate } from "react-router-dom";
import { auth } from "@services/firebase/firebase";

export default function Protected({children}: {children: React.ReactNode}) {
  const user = auth.currentUser;
  if (user) {
    if (user.providerData[0].providerId === "password" && !user.emailVerified) {
      auth.signOut();
      return <Navigate to="/login" />
    }
  } else return <Navigate to="/login" />
  return children;
}