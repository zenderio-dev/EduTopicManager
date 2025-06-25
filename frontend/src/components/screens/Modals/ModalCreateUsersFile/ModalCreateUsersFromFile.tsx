"use client";

import { useForm, useFormState } from "react-hook-form";
import ModalUploadFileForm from "./ModalUploadFileForm";


interface ModalUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  file: FileList;
};

const ModalCreateUsersFromFile = ({ isOpen, onClose }: ModalUploadProps) => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const { errors } = useFormState({ control });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    console.log("Отправка файла:", data.file[0]);

    // после успешной загрузки:
    reset();
    onClose();
  };

  return (
    <ModalUploadFileForm
      isOpen={isOpen}
      onClose={onClose}
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default ModalCreateUsersFromFile;
