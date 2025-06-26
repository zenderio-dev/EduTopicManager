"use client";
import { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";

import {
  useGetAllInfoUserQuery,
  usePatchUserMutation,
} from "@/services/api/userApi";
import CreateTeacherForm from "../CreateTeacherForm/CreateTeacherForm";
import { PatchTeacherType, TeacherType } from "@/types/userTypes";

interface ModalEditTeacherProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: TeacherType;
}

const ModalEditStudent = ({
  isOpen,
  onClose,
  teacher,
}: ModalEditTeacherProps) => {
  const [patchUser, { isLoading }] = usePatchUserMutation();
  const { data: teacherInfo, isLoading: isUserLoading } =
    useGetAllInfoUserQuery(teacher.user_id);

  const { control, handleSubmit, reset, setError } = useForm<PatchTeacherType>({
    defaultValues: {
      username: "",
      password: "",
      re_password: "",
      fullname: "",
      academicTitle: "",
      academicDegree: "",
      jobTitle: "",
      role: "teacher",
    },
  });

  const { errors } = useFormState<PatchTeacherType>({ control });

  useEffect(() => {
    if (teacherInfo && teacherInfo.role === "teacher") {
      reset({
        username: teacherInfo.username,
        password: "",
        re_password: "",
        fullname: teacherInfo.fullname,
        role: teacherInfo.role,
        academicTitle: teacherInfo.academicTitle,
        academicDegree: teacherInfo.academicDegree,
        jobTitle: teacherInfo.jobTitle,
      });
    }
  }, [teacherInfo, reset]);

  const onSubmit = async (formData: PatchTeacherType) => {
    if (formData.password && formData.password !== formData.re_password) {
      setError("re_password", {
        type: "validate",
        message: "Пароли не совпадают",
      });
      return;
    }
    const { password, re_password, ...rest } = formData;
    const data = {
      ...rest,
      ...(password ? { password, re_password } : {}), // добавим только если пароль введён
    };
    try {
      await patchUser({ data: data, id: teacher.user_id }).unwrap();
      onClose();
    } catch (err: any) {
      console.log(err);
      const apiErrors = err?.data ?? {};
      Object.entries(apiErrors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages;
        setError(
          (field in formData
            ? field
            : "non_field_errors") as keyof PatchTeacherType,
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
      isUserLoading={isUserLoading}
      isEdit={true}
    />
  );
};

export default ModalEditStudent;
