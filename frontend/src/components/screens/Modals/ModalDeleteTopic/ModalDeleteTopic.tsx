"use client";
import Modal from "@/components/Modal.tsx/Modal";
import styles from "./ModalDeleteTopic.module.scss";

import MyBtn from "@/components/ui/MyBtn/MyBtn";
import { FullTopicType, TopicType } from "@/types/userTypes";
import { useDeleteTopicMutation } from "@/services/api/topicsApi";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  data: FullTopicType | TopicType;
}

const ModalDeleteTopic = ({ isOpen, onClose, data }: ModalDeleteProps) => {
  const [deleteAccount, { isLoading }] = useDeleteTopicMutation();
  async function handleDelete() {
    await deleteAccount(data.id).unwrap();
    onClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      name="Удаление темы"
      footer={
        <div className={styles.btnContainer}>
          <MyBtn onClick={onClose}>Отмена</MyBtn>
          <MyBtn
            isLoading={isLoading}
            onClick={handleDelete}
            className={styles.deleteBtn}
          >
            Удалить
          </MyBtn>
        </div>
      }
    >
      <div className={styles.modalContainer}>
        <p className={styles.deleteText}>
          Вы уверены, что хотите удалить
          <br /> тему "{data.title}"?
        </p>
      </div>
    </Modal>
  );
};

export default ModalDeleteTopic;
