import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Error, Form, Input, Title, Wrapper } from "./auth-style";
import { sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../../services/firebase/firebase";
import { useNavigate } from "react-router-dom";

interface FormInput {
  email: string;
}

const FindPassword = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: {errors} } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async(data) => {
    setLoading(true);
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        alert("비밀번호 재설정 이메일이 발송되었습니다.");
        navigate("/login");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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