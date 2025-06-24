"use client";
import { useForm, useFormState } from "react-hook-form";
import CreateStudentForm from "./CreateStudentForm";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues extends FullStudentType {
  confirmPassword: string;
}



const ModalCreateStudent = ({ isOpen, onClose }: ModalDeleteProps) => {
  const { control, handleSubmit, setError, } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      role: "student",
      profile: {
        group: "",
        course: 1,
      },
    },
  });

  const { errors } = useFormState<FormValues>({ control });

  const onSubmit = (data: FormValues) => {};

  return (
    <CreateStudentForm
      isOpen={isOpen}
      onClose={onClose}
      errors={errors}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      
    />
  );
};

export default ModalCreateStudent;
