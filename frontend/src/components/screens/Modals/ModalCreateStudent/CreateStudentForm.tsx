import {
  Control,
  Controller,
  FieldErrors,
} from "react-hook-form";
import styles from "./CreateStudentForm.module.scss";
import Modal from "@/components/Modal.tsx/Modal";
import MyBtn from "@/components/ui/MyBtn/MyBtn";
import MyInputForm from "@/components/ui/MyInputForm/MyInputForm";
import MySelectForm from "@/components/ui/MySelect/MySelect";
interface Props {
  control: Control<any>;
  errors: FieldErrors;
  onSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
}
const courseOptions = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }];
const CreateStudentForm = ({
  control,
  errors,
  onSubmit,
  isOpen,
  onClose,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      name="Создание студента"
      footer={
        <div className={styles.btnContainer}>
          <MyBtn onClick={onClose}>Отмена</MyBtn>
          <MyBtn  className={styles.deleteBtn}>
            Создать
          </MyBtn>
        </div>
      }
    >
      <form onSubmit={onSubmit}>
        <div className={styles.inputContainer}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Введите логин",
              minLength: { value: 3, message: "Минимум 3 символа" },
            }}
            render={({ field, fieldState }) => (
              <MyInputForm
                {...field}
                label="Логин"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="fullName"
            control={control}
            rules={{
              required: "Введите фио",
              minLength: { value: 10, message: "Минимум 10 символов" },
            }}
            render={({ field, fieldState }) => (
              <MyInputForm
                {...field}
                label="Фио"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="group"
            control={control}
            rules={{
              required: "Введите Название группы",
              minLength: { value: 3, message: "Минимум 3 символа" },
            }}
            render={({ field, fieldState }) => (
              <MyInputForm
                {...field}
                label="Название Группы"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="course"
            control={control}
            rules={{
              required: "Выберите курс",
            }}
            render={({ field, fieldState }) => (
              <MySelectForm
                options={courseOptions}
                {...field}
                label="Название Группы"
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
};

export default CreateStudentForm;
