import { Control, Controller, FieldErrors } from "react-hook-form";
import styles from "./ModalCreateTheme.module.scss";
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
  isLoading: boolean;
}

const typesOptions = [
  { name: "Курсовая работа" },
  { name: "Дипломная работа" },
];

const ModalCreateThemeFields = ({
  control,
  errors,
  onSubmit,
  isOpen,
  onClose,
  isLoading,
}: Props) => {
  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClose={onClose}
      name={"Создать тему"}
      footer={
        <div className={styles.btnContainer}>
          <MyBtn disabled={isLoading} onClick={onClose}>
            Отмена
          </MyBtn>
          <MyBtn
            isLoading={isLoading}
            disabled={isLoading}
            onClick={onSubmit}
            className={styles.deleteBtn}
          >
            Создать
          </MyBtn>
        </div>
      }
    >
      <form>
        <div className={styles.inputContainer}>
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Введите фио",
              minLength: { value: 5, message: "Минимум 5 символов" },
            }}
            render={({ field, fieldState }) => (
              <MyInputForm
                {...field}
                label="Название темы"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="type_work"
            control={control}
            rules={{
              required: "Выберите тип работы",
            }}
            render={({ field, fieldState }) => (
              <MySelectForm
                options={typesOptions}
                {...field}
                label="Тип работы"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{
              required: "Введите Описание",
              minLength: { value: 10, message: "Минимум 10 символа" },
            }}
            render={({ field, fieldState }) => (
              <MyInputForm
                {...field}
                label="Описание темы"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateThemeFields;
