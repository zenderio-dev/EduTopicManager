import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./MyInputForm.module.scss";

interface MyInputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

const MyInputForm = forwardRef<HTMLInputElement, MyInputFormProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        <input
          autoComplete="new-password"
          id={inputId}
          ref={ref}
          className={clsx(styles.input, className, {})}
          {...props}
        />
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
);

export default MyInputForm;
