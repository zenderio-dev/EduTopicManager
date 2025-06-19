import clsx from "clsx";
import styles from "./MyInput.module.scss";

const MyInput = ({label, type, className,  ...props}:{label:string, type:string, className?: React.ReactNode}) => {
  return (
    <div className={styles.inputGroup}>
      
      <input
        {...props}
        type="text"
        id="username"
        name="username"
        className={clsx(styles.input, className)}
        required
      />
      <div className={styles.line}>
        <div className={styles.lineInner}></div>
      </div>
      <label className={styles.label} htmlFor="username"> {label} </label>
    </div>
  );
};

export default MyInput;
