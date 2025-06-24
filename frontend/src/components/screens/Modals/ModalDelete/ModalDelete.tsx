"use client";
import Modal from "@/components/Modal.tsx/Modal";
import styles from "./ModalDelete.module.scss";
import User from "@/components/User/User";
import MyBtn from "@/components/ui/MyBtn/MyBtn";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  user: StudentType | TeacherType;
}

const ModalDelete = ({ isOpen, onClose, user }: ModalDeleteProps) => {
  function handleDelete(){
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Удаление пользователя"
    footer={
      (
        <div className={styles.btnContainer}>
          <MyBtn onClick={onClose}>Отмена</MyBtn>
          <MyBtn onClick={handleDelete} className={styles.deleteBtn}>Удалить</MyBtn>
        </div>
      )
    }
    >
      <div className={styles.modalContainer}>
        <p className={styles.deleteText}>
          Вы уверены, что хотите удалить
          <br /> пользователя?
        </p>
        <User className={styles.user} user={user}></User>
      </div>
    </Modal>
  );
};

export default ModalDelete;
