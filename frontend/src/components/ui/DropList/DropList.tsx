"use client";
import styles from "./DropList.module.scss";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import MyBtnForChoose from "../MyBtnForChoose/MyBtnForChoose";

type DropItem = { name: string | number;  icon?: React.ReactNode };

interface DropListProps {
  className?: string;
  elems: DropItem[];
  isOpen: boolean;
  timeAnimation?: number;
  onClose: () => void;
  onSelect: (action:DropItem) => void;
}

const DropList = ({
  className,
  elems,
  isOpen = false,
  timeAnimation = 0.15,
  onClose,
  onSelect,
}: DropListProps) => {
  const [isVisible, setIsVisible] = useState(false); // монтирован ли
  const [isAnimation, setIsAnimation] = useState(false); // включена ли анимация
  const ref = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsAnimation(false);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, timeAnimation * 900);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);


  useEffect(() => {
    if (isVisible) {
      const frame = requestAnimationFrame(() => setIsAnimation(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      className={clsx(
        styles.dropList,
        className,
        isAnimation && styles.animation
      )}
      style={{
        transition: `transform ${timeAnimation}s ease`,
      }}
    >
      <nav>
        <ul>
          {elems.map((elem, index) => (
            <li key={index} className={styles.dropItem}>
              <MyBtnForChoose
              
                className={styles.myBtn}
                onClick={() => {
                  onSelect(elem);
                  onClose();
                }}
              >
                {elem.name}
              </MyBtnForChoose>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DropList;
