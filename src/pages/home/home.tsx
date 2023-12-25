
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase/firebase"

export default function Home() {
  const navigate = useNavigate();
  const logout = async() => {
    await auth.signOut();
    navigate(`${import.meta.env.BASE_URL}login`)
  }
  return (
    <>
      <h1><button onClick={logout}>Logout</button></h1>
    </>
  )
}