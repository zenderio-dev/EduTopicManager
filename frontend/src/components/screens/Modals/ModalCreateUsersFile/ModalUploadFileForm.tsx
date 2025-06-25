import { Control, Controller, FieldErrors } from "react-hook-form";
import Modal from "@/components/Modal.tsx/Modal";
import MyBtn from "@/components/ui/MyBtn/MyBtn";
import styles from "./ModalUploadFileForm.module.scss";
import UploadFile from "@/components/ui/UploadFile/UploadFile";

interface Props {
  control: Control<any>;
  errors: FieldErrors;
  onSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ModalUploadFileForm = ({
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
      name="Загрузка пользователей из файла"
      footer={
        <div className={styles.btnContainer}>
          <MyBtn onClick={onClose}>Отмена</MyBtn>
          <MyBtn className={styles.submitBtn} onClick={onSubmit}>
            Отправить
          </MyBtn>
        </div>
      }
    >
      <form className={styles.form}>
        <Controller
          name="file"
          control={control}
          rules={{ required: "Файл обязателен" }}
          render={({ field, fieldState }) => (
            <UploadFile
              onChange={field.onChange}
              fileName={field.value?.[0]?.name}
              error={fieldState.error?.message}
            />
          )}
        />
      </form>
    </Modal>
  );
};

export default ModalUploadFileForm;
