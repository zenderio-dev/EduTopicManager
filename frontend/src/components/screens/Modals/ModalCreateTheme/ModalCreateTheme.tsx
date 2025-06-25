import React from "react";
import { useForm, useFormState } from "react-hook-form";
import ModalCreateThemeFields from "./ModalCreateThemeFields";
interface ModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTheme = ({ isOpen, onClose }: ModalCreateProps) => {
  const { control, handleSubmit, setError } = useForm<ThemeType>({
    defaultValues: {
      title: "",
      description: "",
      type_work: "coursework",
    },
  });
  const { errors } = useFormState<ThemeType>({ control });

  const onSubmit = (data: ThemeType) => {};
  return (
    <ModalCreateThemeFields
      isOpen={isOpen}
      onClose={onClose}
      errors={errors}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={false}
    />
  );
};

export default ModalCreateTheme;
