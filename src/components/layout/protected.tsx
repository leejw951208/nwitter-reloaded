import { Navigate } from "react-router-dom";
import { auth } from "@services/firebase/firebase";

export default function Protected({children}: {children: React.ReactNode}) {
  const user = auth.currentUser;
  // 로컬 로그인은 이메일 인증 후 접근 가능
  if (user) {
    if (user.providerData[0].providerId === "password" && !user.emailVerified) {
      auth.signOut();
      return <Navigate to="/login" />
    }
  } else return <Navigate to="/login" />
  return children;
}