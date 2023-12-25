import { Navigate } from "react-router-dom";
import { auth } from "@services/firebase/firebase";

export default function Protected({children}: {children: React.ReactNode}) {
  const user = auth.currentUser;
  if (user) {
    if (user.providerData[0].providerId === "password" && !user.emailVerified) {
      auth.signOut();
      return <Navigate to={`${import.meta.env.BASE_URL}login`} />
    }
  } else return <Navigate to={`${import.meta.env.BASE_URL}login`} />
  return children;
}