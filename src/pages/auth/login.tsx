import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../services/firebase/firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "./auth-style";
import { FirebaseErrorMessage } from "../../constants/message";
import styled from "styled-components";
import OAuthGithub from "../../components/oauth/oauth-github";
import OAuthGoogle from "../../components/oauth/oauth-google";

const ForgotPassword = styled.span`
  display: flex;
  justify-content: flex-end;
  color: #1d9bf0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

interface FormInput {
  name: string;
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setError, reset, formState: {errors} } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async(data) => {
    if (loading) return;

    setLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        if (!result.user.emailVerified) {
          auth.signOut();
          throw "이메일 인증 후 로그인 가능합니다.";          
        }
        navigate(import.meta.env.BASE_URL)
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          setError("root", {
            type: "manual",
            message: FirebaseErrorMessage[error.code],
          });
        } else if (typeof error === "string") {
          setError("root", {
            type: "manual",
            message: error,
          });
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="email" {...register('email', {
          required: "이메일은 필수입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "올바른 이메일을 입력해주세요.",
          }
        })} />
        <Error>{errors?.email?.message}</Error>        
        <Input type="password" placeholder="password" {...register('password', {
          required: "비밀번호는 필수입니다.",
          minLength: {
            value: 8,
            message: "비밀번호는 최소 8글자 이상이어야 합니다.",
          },
        })} />
        <ForgotPassword>
          <Link to={`${import.meta.env.BASE_URL}find-password`}>Forgot password?</Link> 
        </ForgotPassword>
        <Error>{errors?.password?.message}</Error>
        <Input type="submit" value={loading ? "Loading..." : "Login"}/>
      </Form>
      <Error>{errors?.root?.message}</Error>
      <Switcher>
        Don't have an account? <Link to={`${import.meta.env.BASE_URL}join`}>Join &rarr;</Link>
      </Switcher>
      <OAuthGoogle resetForm={reset}/>
      <OAuthGithub resetForm={reset}/>
    </Wrapper>
  );
}