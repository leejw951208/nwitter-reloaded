import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useState } from "react";
import { Error } from "./auth-components";
import { FirebaseErrorMessage } from "./error-message";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  margin-top: 50px;
  margin-bottom: 10px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Logo = styled.img`
  height: 25px;
`;

export default function OAuthGoogle({ resetForm }: { resetForm: () => void }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onClick = async () => {
    resetForm();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          navigate("/");
        })
        .catch(e => {
          setError(FirebaseErrorMessage[e.code]);
        });
  };
  return (
    <>
      <Button onClick={onClick}>
        <Logo src="/google-logo.svg" />
        Continue with Google
      </Button>
      <Error>{error ? error : null}</Error>
    </>
  )
}