// ModalEditTopic.tsx
"use client";

import React, { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";

import { PatchTopicType } from "@/types/userTypes";
import { usePatchTopicMutation } from "@/services/api/topicsApi";
import CreateTopicForm from "../CreateTopicForm/CreateTopicForm";

interface ModalPatchProps {
  isOpen: boolean;
  onClose: () => void;
  data: PatchTopicType;
}

// Словарь для преобразования русских названий в англ. коды
const russianToEnglish: Record<string, "coursework" | "diploma" | "both"> = {
  "Курсовая работа":   "coursework",
  "Дипломная работа":  "diploma",
  "Совместная работа": "both",
};

const ModalEditTopic = ({ isOpen, onClose, data }: ModalPatchProps) => {
  const [patchTopic, { isLoading }] = usePatchTopicMutation();

  const { control, reset, handleSubmit, setError } = useForm<PatchTopicType>({
    defaultValues: {
      title:       data.title,
      description: data.description,
      type_work:   data.type_work,
    },
  });

  const { errors } = useFormState<PatchTopicType>({ control });

  // Если data приходит асинхронно, сбрасываем форму при изменении
  useEffect(() => {
    reset({
      title:       data.title,
      description: data.description,
      type_work:   data.type_work,
    });
  }, [data, reset]);

  const onSubmit = async (formData: PatchTopicType) => {
    const engType = russianToEnglish[
      formData.type_work as unknown as string
    ] ?? formData.type_work;

    const payload: PatchTopicType = {
      ...formData,
      type_work: engType,
    };

    try {
      await patchTopic({ id: data.id!, data: payload }).unwrap();
      onClose();
    } catch (err: any) {
      const apiErrors = err?.data ?? {};
      Object.entries(apiErrors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages;
        setError(
          (field in formData
            ? (field as keyof PatchTopicType)
            : "non_field_errors") as keyof PatchTopicType,
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
      isEdit={true}
    />
  );
};

export default ModalEditTopic;
