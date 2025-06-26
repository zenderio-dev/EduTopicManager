"use client";
import { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import CreateStudentForm from "../CreateStudentForm/CreateStudentForm";
import {
  useGetAllInfoUserQuery,
  usePatchUserMutation,
} from "@/services/api/userApi";
import { PatchStudentType, StudentType } from "@/types/userTypes";

interface ModalEditStudentProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentType;
}

const ModalEditStudent = ({
  isOpen,
  onClose,
  student,
}: ModalEditStudentProps) => {
  const [patchUser, { isLoading }] = usePatchUserMutation();
  const { data: studentInfo, isLoading: isUserLoading } =
    useGetAllInfoUserQuery(student.user_id);

  const { control, handleSubmit, reset, setError } = useForm<PatchStudentType>({
    defaultValues: {
      username: "",
      password: "",
      re_password: "",
      fullname: "",
      group: "",
      role: "student",
      course: 0,
    },
  });

  const { errors } = useFormState<PatchStudentType>({ control });

  useEffect(() => {
    if (studentInfo && studentInfo.role === "student") {
      reset({
        username: studentInfo.username,
        password: "",
        re_password: "",
        fullname: studentInfo.fullname,
        role: studentInfo.role,
        group: studentInfo.group,
        course: studentInfo.course,
      });
    }
  }, [studentInfo, reset]);

  const onSubmit = async (formData: PatchStudentType) => {
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
      await patchUser({ data: data, id: student.user_id }).unwrap();
      onClose();
    } catch (err: any) {
      console.log(err);
      const apiErrors = err?.data ?? {};
      Object.entries(apiErrors).forEach(([field, messages]) => {
        const message = Array.isArray(messages) ? messages[0] : messages;
        setError(
          (field in formData
            ? field
            : "non_field_errors") as keyof PatchStudentType,
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
      isUserLoading={isUserLoading}
      isEdit={true}
    />
  );
};

export default ModalEditStudent;
