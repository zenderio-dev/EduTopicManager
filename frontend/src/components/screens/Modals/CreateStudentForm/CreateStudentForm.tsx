import { Control, Controller, FieldErrors } from "react-hook-form";
import styles from "./CreateStudentForm.module.scss";
import Modal from "@/components/Modal.tsx/Modal";
import MyBtn from "@/components/ui/MyBtn/MyBtn";
import MyInputForm from "@/components/ui/MyInputForm/MyInputForm";
import MySelectForm from "@/components/ui/MySelect/MySelect";
import CollapsibleField from "@/components/ui/CollapsibleField/CollapsibleField";

interface Props {
  control: Control<any>;
  errors: FieldErrors;
  onSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  isEdit?: boolean;
  isUserLoading?: boolean;
}

const courseOptions = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }];

const CreateStudentForm = ({
  control,
  errors,
  onSubmit,
  isOpen,
  onClose,
  isLoading,
  isUserLoading=false,
  isEdit,
}: Props) => {
  return (
    <Modal
    isLoading={isUserLoading}
      className={styles.modal}
      isOpen={isOpen}
      onClose={onClose}
      name={isEdit ? "Редактирование студента" : "Создание студента"}
      
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
            name="fullname"
            control={control}
            rules={{
              required: "Введите ФИО",
              minLength: { value: 10, message: "Минимум 10 символов" },
            }}
            render={({ field, fieldState }) => (
              <MyInputForm
                {...field}
                label="ФИО"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="group"
            control={control}
            rules={{
              required: "Введите название группы",
              minLength: { value: 3, message: "Минимум 3 символа" },
            }}
            render={({ field, fieldState }) => (
              <MyInputForm
                {...field}
                label="Группа"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="course"
            control={control}
            rules={{ required: "Выберите курс" }}
            render={({ field, fieldState }) => (
              <MySelectForm
                options={courseOptions}
                {...field}
                label="Курс"
                error={fieldState.error?.message}
              />
            )}
          />

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

          {isEdit ? (
            <CollapsibleField name="Изменить пароль">
              <Controller
                name="password"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length === 0 ||
                    value.length >= 8 ||
                    "Минимум 8 символов",
                }}
                render={({ field, fieldState }) => (
                  <MyInputForm
                    {...field}
                    label="Новый пароль"
                    type="password"
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="re_password"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length === 0 ||
                    value.length >= 8 ||
                    "Минимум 8 символов",
                }}
                render={({ field, fieldState }) => (
                  <MyInputForm
                    {...field}
                    label="Подтвердите пароль"
                    type="password"
                    error={fieldState.error?.message}
                  />
                )}
              />
            </CollapsibleField>
          ) : (
            <>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Введите пароль",
                  minLength: { value: 8, message: "Минимум 8 символов" },
                }}
                render={({ field, fieldState }) => (
                  <MyInputForm
                    {...field}
                    label="Пароль"
                    type="password"
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="re_password"
                control={control}
                rules={{
                  required: "Подтвердите пароль",
                  minLength: { value: 8, message: "Минимум 8 символов" },
                }}
                render={({ field, fieldState }) => (
                  <MyInputForm
                    {...field}
                    label="Подтвердите пароль"
                    type="password"
                    error={fieldState.error?.message}
                  />
                )}
              />
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CreateStudentForm;
