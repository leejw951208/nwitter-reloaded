import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import { FirebaseErrorMessage } from "../components/error-message";
import OAuthGithub from "../components/oauth-github";
import OAuthGoogle from "../components/oauth-google";

interface FormInput {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const user = auth.currentUser;
  if (user) return <Navigate to="/" />

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setError, reset, formState: {errors} } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async(data) => {
    if (loading) return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
      sendEmailVerification(credentials.user); // 이메일 링크 전송
      await updateProfile(credentials.user, {
        displayName: data.name
      });
      auth.signOut(); // 회원가입 시 자동 로그인이 되서 강제 로그아웃
      navigate("/login");
    } catch(e) {
      if (e instanceof FirebaseError) {
        setError("email", {
          type: "manual",
          message: FirebaseErrorMessage[e.code],
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Join X</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="name" {...register('name', {
          required: "이름은 필수입니다."
        })} />
        <Error>{errors?.name?.message}</Error>
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