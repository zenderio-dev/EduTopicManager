"use client";
import { useRef } from "react";
import {
  useForm,
  SubmitHandler,
  useFormState,
  FieldError,
} from "react-hook-form";
import { useLoginMutation } from "@/services/auth/userApi";
import { setAuthToken } from "@/utils/auth";
import LoginForm from "./LoginForm";

interface FormValues extends FullStudentType{
non_field_errors?:FieldError
}

const Login = () => {
  const { control, handleSubmit, setError, clearErrors } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { errors } = useFormState<FormValues>({ control });
  const [login, { isLoading }] = useLoginMutation();

 

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await login(data).unwrap();
      setAuthToken(result);
    } catch (error: any) {
      const apiErrors = error?.data ?? {};
      Object.entries(apiErrors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages;
        setError(
          (field in data ? field : "non_field_errors") as keyof FormValues,
          { type: "server", message }
        );
      });
    }
  };

  return (
    <LoginForm
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      
      clearErrors={clearErrors}
    />
  );
};

export default Login;
