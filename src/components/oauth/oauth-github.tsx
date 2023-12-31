import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../../services/firebase/firebase";
import { useState } from "react";
import { Error } from "../../pages/auth/auth-style";
import { FirebaseErrorMessage } from "../../constants/message";
import { useNavigate } from "react-router-dom";

import githubLogo from "@assets/img/github-logo.svg";
import { FirebaseError } from "@firebase/util";

const Button = styled.span`
  margin-top: 5px;
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

export default function OAuthGithub({ resetForm }: { resetForm: () => void }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onClick = async() => {
    try {
      resetForm();
      await signInWithPopup(auth, new GithubAuthProvider());
      navigate("/");
    } catch(e) {
      if (e instanceof FirebaseError) {
        setError(FirebaseErrorMessage[e.code]);
      }
    }
  };
  return (
    <>
      <Button onClick={onClick}>
        <Logo src={githubLogo} />
        Continue with Github
      </Button>
      <Error>{error ? error : null}</Error>
    </>
  )
}