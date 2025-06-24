import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./MyInputLogin.module.scss";

interface MyInputLoginProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  
}

const MyInputLogin = forwardRef<HTMLInputElement, MyInputLoginProps>(
  ({ label, type, className, error, ...props }, ref) => {
    const inputId =
      props.id || "input-" + label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={styles.inputGroup}>
        <input
          ref={ref}
          type={type}
          id={inputId}
          autoComplete="off"
          placeholder=" "
          className={clsx(styles.input, className)}
          {...props}
        />
        <div className={styles.line}>
          <div className={styles.lineInner}></div>
        </div>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  }
);

export default MyInputLogin;
