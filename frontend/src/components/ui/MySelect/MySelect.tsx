"use client";

import { useState, useRef } from "react";
import DropList from "../DropList/DropList";
import styles from "./MySelect.module.scss";
import clsx from "clsx";

export type DropItem = {
  name: string | number;
  value?: string | number;
  icon?: React.ReactNode;
};

interface MySelectFormProps {
  label: string;
  value?: string | number;
  options: DropItem[];
  onChange: (value: string | number) => void;
  error?: string;
  className?: string;
}

const MySelectForm = ({
  label,
  value,
  options,
  onChange,
  error,
  className,
}: MySelectFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = options.find((opt) => opt.name === value);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={clsx(styles.selectContainer, className)} ref={containerRef}>
      <label className={styles.label}>{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.selectButton}
      >
        {current?.name || "Выберите"}
        <div
          className={clsx(styles.arrow, { [styles.openArrow]: isOpen })}
        ></div>
      </button>
      <div className={styles.dropListContainer}>
        <DropList
          className={styles.dropList}
          elems={options}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(item) => onChange(item.name)}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default MySelectForm;
