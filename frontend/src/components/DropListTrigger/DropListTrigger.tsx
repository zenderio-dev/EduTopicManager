"use client";
import { useState } from "react";
import styles from "./DropListTrigger.module.scss";
import DropList from "../ui/DropList/DropList";
import React from "react";
import clsx from "clsx";

interface ActionType {
  name: string;
  modal?: (props: ModalWithControlProps) => React.ReactElement;
}

interface TriggerProps {
  children: React.ReactNode;
  actions: ActionType[];
}

interface ModalWithControlProps {
  onClose: () => void;
  isOpen: boolean;
  [key: string]: any;
}

const DropListTrigger = ({ children, actions }: TriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  console.log(modalContent);
  const handleSelect = (action: ActionType) => {
    if (action.modal) {
      setModalContent(
        action.modal({
          onClose: () => setModalContent(null),
          isOpen: true,
        })
      );
    }
  };
  return (
    <div
      className={clsx(
        styles.dropListContainer,
        isOpen && styles.activeZ // <- добавляем класс при открытии
      )}
    >
      <div
        className={styles.btnDropList}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {children}
      </div>

      <div className={styles.dropList}>
        <DropList
          elems={actions}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={handleSelect}
        />
      </div>

      {modalContent}
    </div>
  );
};

export default DropListTrigger;
