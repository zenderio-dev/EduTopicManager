"use client";
import { useForm, useFormState } from "react-hook-form";
import CreateStudentForm from "../CreateStudentForm/CreateStudentForm";
import { useCreateAccountMutation } from "@/services/auth/userApi";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues extends FullStudentType {
  re_password: string;
}

const ModalCreateStudent = ({ isOpen, onClose }: ModalDeleteProps) => {
  const { control, handleSubmit, setError } = useForm<FormValues>({
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

  const { errors } = useFormState<FormValues>({ control });

  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const onSubmit = async (formData: FormValues) => {
    console.log(formData)
    if (formData.password !== formData.re_password) {
      setError("re_password", {
        type: "validate",
        message: "Пароли не совпадают",
      });
      return;
    }

    try {
      const userPayload = {
        ...formData,
        role: "student", 
        group_name: formData.group,
      };

      console.log("userPayload:", userPayload); 

      await createAccount(userPayload).unwrap();
      onClose();
    } catch (err: any) {
      const message = err?.data?.detail ?? "Ошибка при создании аккаунта";
      setError("username", {
        type: "server",
        message,
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
