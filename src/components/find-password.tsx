import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Error, Form, Input, Title, Wrapper } from "./auth-components";
import { sendEmailVerification, sendPasswordResetEmail, updateEmail, validatePassword, verifyBeforeUpdateEmail, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase";

interface FormInput {
  email: string;
}

const FindPassword = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setError, reset, formState: {errors} } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async(data) => {
    try {
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Wrapper>
      <Title>Reset your password</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="email" {...register('email', {
          required: "이메일은 필수입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "올바른 이메일을 입력해주세요.",
          }
        })} />
        <Error>{errors?.email?.message}</Error>
        <Input type="submit" value={loading ? "Loading..." : "Send password reset email"}/>
      </Form>
    </Wrapper>
  )
}

export { FindPassword }