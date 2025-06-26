"use client";
import { useForm, useFormState } from "react-hook-form";

import { useCreateAccountMutation } from "@/services/auth/userApi";
import CreateTeacherForm from "../CreateTeacherForm/CreateTeacherForm";


interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}


const ModalCreateStudent = ({ isOpen, onClose }: ModalDeleteProps) => {
  const { control, handleSubmit, setError } = useForm<RegisterTeacherType>({
    defaultValues: {
      username: "",
      password: "",
      re_password: "",
      fullname: "",
      role: "teacher",
      academicTitle: "",
      academicDegree: "",
      jobTitle: "",
      
    },
  });

  const { errors } = useFormState<RegisterTeacherType>({ control });

  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const onSubmit = async (formData: RegisterTeacherType) => {
    console.log(formData)
    if (formData.password !== formData.re_password) {
      setError("re_password", {
        type: "validate",
        message: "Пароли не совпадают",
      });
      return;
    }

    try {
      await createAccount(formData).unwrap();
      onClose();
    } catch (err: any) {
      console.log(err)
      const apiErrors = err?.data ?? {};
       Object.entries(apiErrors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages;
        setError(
          (field in formData ? field : "non_field_errors") as keyof RegisterTeacherType,
          { type: "server", message }
        );
      });
    }
  };
  return (
    <CreateTeacherForm
      isOpen={isOpen}
      onClose={onClose}
      errors={errors}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    />
  );
};

export default ModalCreateStudent;
