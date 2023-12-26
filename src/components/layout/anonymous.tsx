import { Navigate } from "react-router-dom";
import { auth } from "@services/firebase/firebase";

export default function Anonymous({children}: {children: React.ReactNode}) {
  const user = auth.currentUser;
  if (user) {
    return <Navigate to="" />
  }
  return children;
}