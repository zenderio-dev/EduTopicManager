import clsx from "clsx";
import styles from "./Modal.module.scss";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import Loader from "../ui/Loader/Loader";
interface PropsModal {
  children: React.ReactNode;
  isOpen: boolean;
  name: string;
  onClose: () => void;
  footer?: React.ReactNode;
  className?: string
  isLoading?: boolean;  
}

const Modal = ({ children, name, isOpen, onClose, footer, className, isLoading=false }: PropsModal) => {
  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [isOpen]);
  if (!isOpen) return null;
  return (
    <div className={styles.modalContainer}>
      <div
        className={clsx(styles.modal, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className={styles.modalHeader}>
          
          <div className={styles.headerContainer}>
            <h2 id="modal-title" className={styles.name}>
              {name}
            </h2>
            <button className={styles.buttonClose} onClick={onClose}>
              <MdClose size={30} />
            </button>
          </div>
        </header>
        <main className={styles.modalMain}>
          {isLoading ? (
            <div className={styles.loading}><Loader color="#000" size={30}/></div>
          ) : (
            children
          )}
        </main>
        {footer && <footer className={styles.modalFooter}>{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;
