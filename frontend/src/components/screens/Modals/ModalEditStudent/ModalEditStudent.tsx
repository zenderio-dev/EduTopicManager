"use client";
import { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import CreateStudentForm from "../CreateStudentForm/CreateStudentForm";


interface ModalEditStudentProps {
  isOpen: boolean;
  onClose: () => void;
  student: FullStudentType | null;
}

interface FormValues extends FullStudentType {
  confirmPassword: string;
}

const ModalEditStudent = ({ isOpen, onClose, student }: ModalEditStudentProps) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      group: "",
      course: 1,
      
    },
  });

  const { errors } = useFormState<FormValues>({ control });

  useEffect(() => {
    if (student) {
      reset({
        username: student.username,
        password: "",
        confirmPassword: "",
        fullName: student.fullName,
        role: student.role,
        group: student.group,
        course: student.course,
        
      });
    }
  }, [student, reset]);

  const onSubmit = (data: FormValues) => {
    // send PUT/PATCH request here
  };

  return (
    <CreateStudentForm
      isOpen={isOpen}
      onClose={onClose}
      errors={errors}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={false}
      isEdit={true}
    />
  );
};

export default ModalEditStudent;
