import styles from "./UploadFile.module.scss";
import { ChangeEvent } from "react";

interface UploadFileProps {
  label?: string;
  onChange: (files: FileList | null) => void;
  fileName?: string;
  error?: string;
  disabled?: boolean;
}

const UploadFile = ({
  label = "Выбрать файл",
  onChange,
  fileName,
  error,
  disabled,
}: UploadFileProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
  };

  return (
    <div className={styles.uploadWrapper}>
      <label className={styles.label}>{label} </label>
        
        <input
          type="file"
          onChange={handleFileChange}
          disabled={disabled}
          className={styles.input}
        />
     

      {fileName && <p className={styles.fileName}>{fileName}</p>}
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default UploadFile;
