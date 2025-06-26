"use client";
import { useForm, useFormState } from "react-hook-form";
import CreateStudentForm from "../CreateStudentForm/CreateStudentForm";
import { useCreateAccountMutation } from "@/services/api/userApi";
import { count } from "console";
import { use } from "react";
import { RegisterStudentType } from "@/types/userTypes";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateStudent = ({ isOpen, onClose }: ModalDeleteProps) => {
  const { control, handleSubmit, setError } = useForm<RegisterStudentType>({
    defaultValues: {
      username: "",
      password: "",
      re_password: "",
      fullname: "",
      role: "student",
      group: "",
      course: 1,
    },
  });

  const { errors } = useFormState<RegisterStudentType>({ control });

  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const onSubmit = async (formData: RegisterStudentType) => {
    console.log(formData);
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
      console.log(err);
      const apiErrors = err?.data ?? {};
      Object.entries(apiErrors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages;
        setError(
          (field in formData
            ? field
            : "non_field_errors") as keyof RegisterStudentType,
          { type: "server", message }
        );
      });
    }
  };
  return (
    <CreateStudentForm
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
