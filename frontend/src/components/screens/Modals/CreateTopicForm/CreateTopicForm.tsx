import { Control, Controller, FieldErrors } from "react-hook-form";
import styles from "./CreateTopicForm.module.scss";
import Modal from "@/components/Modal.tsx/Modal";
import MyBtn from "@/components/ui/MyBtn/MyBtn";
import MyInputForm from "@/components/ui/MyInputForm/MyInputForm";
import MySelectForm from "@/components/ui/MySelect/MySelect";
import MyTextarea from "@/components/ui/MyTextArea/MyTextArea";


interface Props {
  control: Control<any>;
  errors: FieldErrors;
  onSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  isEdit?: boolean;
}

const typesOptions = [
  { name: "Курсовая работа", value: "coursework" },
  { name: "Дипломная работа", value: "diploma" },
  { name: "Совместная работа", value: "both" },
];

const ModalCreateTopicFields = ({
  control,
  errors,
  onSubmit,
  isOpen,
  onClose,
  isLoading,
  isEdit = false,
}: Props) => {
  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClose={onClose}
      name={isEdit ? "Изменить тему":"Создать тему"}
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
            {isEdit ? "Сохранить" : "Создать"}
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
              required: "Введите название темы",
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
              minLength: { value: 10, message: "Минимум 10 символов" },
            }}
            render={({ field, fieldState }) => (
              <MyTextarea
                {...field}
                label="Описание темы"
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateTopicFields;
