"use client";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { useLoginMutation, useLazyMyAccountQuery } from "@/services/auth/userApi";
import { setAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";


const Login = () => {
  const { control, handleSubmit, setError, clearErrors } = useForm<LoginType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { errors } = useFormState<LoginType>({ control });
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [fetchMyAccount, { isFetching: isAccountFetching }] = useLazyMyAccountQuery();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      const result = await login(data).unwrap();
      
      setAuthToken(result.auth_token);
      const userData = await fetchMyAccount().unwrap();
      
      switch (userData.role) {
        case "student":
          router.push("/student/themes");
          break;
        case "teacher":
          router.push("/teacher/themes");
          break;
        case "admin":
          router.push("/admin/students");
          break;
      }
    } catch (error: any) {
      console.log(error)
      const apiErrors = error?.data ?? {};
      Object.entries(apiErrors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages;
        setError(
          (field in data ? field : "non_field_errors") as keyof LoginType,
          { type: "server", message }
        );
      });
    }
  };

  const isLoading = isLoginLoading || isAccountFetching;

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