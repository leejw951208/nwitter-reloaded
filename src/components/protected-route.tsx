import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
  const user = auth.currentUser;
  // 이메일 인증을 하지 않은 경우 강제 로그아웃
  if (user) {
    if (user.providerData[0].providerId === "password" && !user.emailVerified) {
      auth.signOut();
      return <Navigate to="/login" />
    }
  } else return <Navigate to="/login" />;
  return children;
}