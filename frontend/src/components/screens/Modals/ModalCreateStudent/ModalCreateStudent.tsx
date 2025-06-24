"use client";
import Modal from "@/components/Modal.tsx/Modal";
import styles from "./ModalCreateStudent.module.scss";
import MyInputForm from "@/components/ui/MyInputForm/MyInputForm";
import { useForm, useFormState } from "react-hook-form";
import { error } from "console";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues extends FullStudentType {
  confirmPassword: string;
}

const courseOptions = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }];

const ModalCreateStudent = ({ isOpen, onClose }: ModalDeleteProps) => {
  const { control, handleSubmit, setError } = useForm<FormValues>({
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

  const onSubmit = (data: FormValues) => {
  }


   return (
    <Modal isOpen={isOpen} onClose={onClose} name="Создать студента">
      <ModalCreateStudent  />
    </Modal>
  );  
};

export default ModalCreateStudent;
