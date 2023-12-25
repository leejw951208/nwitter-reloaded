import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../services/firebase/firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Error, Form, Input, Switcher, Title, Wrapper } from "./auth-style";
import { FirebaseErrorMessage } from "../../constants/message";
import OAuthGithub from "../../components/oauth/oauth-github";
import OAuthGoogle from "../../components/oauth/oauth-google";

interface FormInput {
  name: string;
  email: string;
  password: string;
}

export default function Join() {
  const user = auth.currentUser;
  if (user) return <Navigate to="/" />

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setError, reset, formState: {errors} } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async(data) => {
    if (loading) return;

    setLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        sendEmailVerification(result.user)
          .then(() => {
            alert("인증 메일이 발송되었습니다.");
            navigate("/")
          })
      })
      .catch(error => {
        setError("email", {
          type: "manual",
          message: FirebaseErrorMessage[error.code],
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <Wrapper>
      <Title>Join</Title>
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
        <Error>{errors?.password?.message}</Error>
        <Input type="submit" value={loading ? "Loading..." : "Join"}/>
      </Form>
      <Switcher>
        Already have an account? <Link to="/login">Login</Link>
      </Switcher>
      <OAuthGoogle resetForm={reset}/>
      <OAuthGithub resetForm={reset}/>
    </Wrapper>
  );
}