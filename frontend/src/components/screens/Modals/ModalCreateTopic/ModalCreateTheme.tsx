import React from "react";
import { useForm, useFormState } from "react-hook-form";

import { CreateTopicType } from "@/types/userTypes";
import CreateTopicForm from "../CreateTopicForm/CreateTopicForm";
import { useCreateTopicMutation } from "@/services/api/topicsApi";

interface ModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
}
const typeWorkMap: Record<string, "coursework" | "diploma" | "both"> = {
  "Курсовая работа": "coursework",
  "Дипломная работа": "diploma",
  "Совместная работа": "both",
};
const ModalCreateTopic = ({ isOpen, onClose }: ModalCreateProps) => {
  const [createTopic, { isLoading }] = useCreateTopicMutation();

  const { control, handleSubmit, setError } = useForm<CreateTopicType>({
    defaultValues: {
      title: "",
      description: "",
      type_work: "coursework",
    },
  });
  const { errors } = useFormState<CreateTopicType>({ control });

  const onSubmit = async (formData: CreateTopicType) => {

  try {
    const mappedFormData = {
      ...formData,
      type_work: typeWorkMap[formData.type_work] ?? formData.type_work,
    };
    console.log(mappedFormData);
    await createTopic(mappedFormData).unwrap();
    onClose();
  } catch (err: any) {
    const apiErrors = err?.data ?? {};
    Object.entries(apiErrors).forEach(([field, messages]) => {
      const message = Array.isArray(messages) ? messages[0] : messages;
      setError(
        (field in formData
          ? field
          : "non_field_errors") as keyof CreateTopicType,
        { type: "server", message }
      );
    });
  }
};
  return (
    <CreateTopicForm
      isOpen={isOpen}
      onClose={onClose}
      errors={errors}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
    />
  );
};

export default ModalCreateTopic;

