import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";
import Link from "next/link";
import styles from "./Login.module.scss";
import MyInputLogin from "../ui/MyInputLogin/MyInputLogin";
import MyBtn from "../ui/MyBtn/MyBtn";

interface Props {
  control: Control<any>;
  errors: FieldErrors;
  onSubmit: () => void;
  isLoading: boolean;

  clearErrors: UseFormClearErrors<any>;
}

const LoginForm = ({
  control,
  errors,
  onSubmit,
  isLoading,
  clearErrors,
}: Props) => {
  
  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <h1>Добро пожаловать</h1>

      <div className={styles.inputContainer}>
        <div className={styles.inputGroup}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Введите логин",
              minLength: { value: 3, message: "Минимум 3 символа" },
            }}
            render={({ field, fieldState }) => (
              <MyInputLogin
                {...field}
                
                label="Логин"
                type="text"
                error={fieldState.error?.message}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("non_field_errors");
                }}
              />
            )}
          />
        </div>

        <div className={styles.inputGroup}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Введите пароль",
              minLength: { value: 8, message: "Минимум 8 символов" },
            }}
            render={({ field, fieldState }) => (
              <MyInputLogin
                {...field}
                label="Пароль"
                type='password'
                error={fieldState.error?.message}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("non_field_errors");
                }}
              />
            )}
          />
        </div>
      </div>

      {errors.non_field_errors && (
        <div className={styles.nonFieldError}>
          {errors.non_field_errors.message}
        </div>
      )}

      <Link className={styles.forgot} href="#">
        Забыли логин или пароль?
      </Link>

      <MyBtn isLoading={isLoading} className={styles.btn} type="submit">
        Войти
      </MyBtn>
    </form>
  );
};

export default LoginForm;
