import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const Error = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: tomato;
`;

interface FormInput {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: {errors} } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async(data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: data.name
      });
      navigate("/");
    } catch(e) {

    } finally {
      setIsLoading(true);
    }
  };
  return (
    <Wrapper>
      <Title>Join X</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="name" {...register('name', {
          required: "Name is required."
        })} />
        <Error>{errors?.name?.message}</Error>
        <Input type="text" placeholder="email" {...register('email', {
          required: "Email is required.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Please check your email.",
          }
        })} />
        <Error>{errors?.email?.message}</Error>
        <Input type="password" placeholder="password" {...register('password', {
          required: "Password is required.",
          minLength: {
            value: 8,
            message: "Please use a password of at least 8 characters.",
          },
        })} />
        <Error>{errors?.password?.message}</Error>
        <Input type="submit" value={isLoading ? "Loading..." : "Create Account"}/>
      </Form>
    </Wrapper>
  );
}