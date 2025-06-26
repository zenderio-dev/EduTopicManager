"use client";
import { useState } from "react";
import styles from "./CollapsibleField.module.scss";
import clsx from "clsx";

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
        <div className={clsx(styles.arrow, {[styles.openArrow]:isOpen})} />
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
