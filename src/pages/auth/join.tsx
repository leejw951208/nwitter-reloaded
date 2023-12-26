import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../services/firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Switcher, Title, Wrapper } from "./auth-style";
import { FirebaseErrorMessage } from "../../constants/message";
import OAuthGithub from "../../components/oauth/oauth-github";
import OAuthGoogle from "../../components/oauth/oauth-google";
import { FirebaseError } from "@firebase/util";

interface FormInput {
  name: string;
  email: string;
  password: string;
}

export default function Join() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setError, reset, formState: {errors} } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async(data) => {
    if (loading) return;
    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      updateProfile(credential.user, {
        displayName: !data.name ? data.email.split("@")[0] : data.name
      });
      await sendEmailVerification(credential.user);
      alert("인증 메일이 발송되었습니다.");
      navigate("/");
    } catch(e) {
      if (e instanceof FirebaseError) {
        setError("email", {
          type: "manual",
          message: FirebaseErrorMessage[e.code],
        });
      }
    } finally {
      setLoading(false)
    };
  };
  return (
    <Wrapper>
      <Title>Join</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="name" {...register('name')} />
        <Input 
          className={errors?.email ? "error" : ""} 
          type="text" 
          placeholder="email" 
          {...register('email', 
            {
              required: true,
              pattern: /\S+@\S+\.\S+/
            }
          )} 
        />
        <Input 
          className={errors?.password ? "error" : ""} 
          type="password" 
          placeholder="password" 
          {...register('password', 
            {
              required: true,
              minLength: 8
            }
          )} 
        />
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