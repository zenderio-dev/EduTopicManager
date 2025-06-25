"use client";
import { useState } from "react";
import styles from "./CollapsibleField.module.scss";

interface Props {
  name: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleField = ({ name, children, defaultOpen = false }: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.toggleBtn}
      >
        {name}
        <span className={`${styles.arrow} ${isOpen ? styles.openArrow : ""}`} />
      </button>

      <div
        className={`${styles.content} ${isOpen ? styles.open : styles.closed}`}
      >
        {isOpen && children}
      </div>
    </div>
  );
};

export default CollapsibleField;
