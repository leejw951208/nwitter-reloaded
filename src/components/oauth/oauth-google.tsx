import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../../services/firebase/firebase";
import { useState } from "react";
import { Error } from "../../pages/auth/auth-style";
import { FirebaseErrorMessage } from "../../constants/message";
import { useNavigate } from "react-router-dom";

import googleLogo from "@assets/img/google-logo.svg";

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
          navigate(import.meta.env.BASE_URL);
        })
        .catch(e => {
          setError(FirebaseErrorMessage[e.code]);
        });
  };
  return (
    <>
      <Button onClick={onClick}>
        <Logo src={googleLogo} />
        Continue with Google
      </Button>
      <Error>{error ? error : null}</Error>
    </>
  )
}