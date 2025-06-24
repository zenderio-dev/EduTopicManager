import styles from "./Modal.module.scss";
import { MdClose } from "react-icons/md";
interface PropsModal {
  children: React.ReactNode;
  isOpen: boolean;
  name: string;
  onClose: () => void;
  footer?: React.ReactNode;
}

const Modal = ({ children, name, isOpen, onClose, footer }: PropsModal) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalContainer}>
      <div
        className={styles.modal}
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
        <main className={styles.modalMain}>{children}</main>
        {footer && <footer className={styles.modalFooter}>{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;
