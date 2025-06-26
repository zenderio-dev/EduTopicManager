// CardTeacher.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

import { TopicListChoiseType } from "@/types/userTypes";
import User from "@/components/User/User";
import Topic from "../Topic/Topic";
import Loader from "../Loader/Loader";

import styles from "./CardTeacher.module.scss";
import { useSetChoisesMutation } from "@/services/api/topicsApi";

interface Props {
  user: TopicListChoiseType | undefined;
  isLoading: boolean;
  isError?: boolean;
}

const ANIMATION_DURATION = 0.3;

const CardTeacher: React.FC<Props> = ({ user, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [chosesMutation, { isLoading: isLoadingChoses }] =
    useSetChoisesMutation();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsAnimated(false);

      const id = setTimeout(
        () => setIsVisible(false),
        ANIMATION_DURATION * 1000
      );
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isVisible) {
      requestAnimationFrame(() => setIsAnimated(true));
    }
  }, [isVisible]);

  if (isLoading) return <Loader />;
  if (!user) return null;
  async function onChoose(topicId: number) {
    await chosesMutation({ body: { topic: topicId } }).unwrap();
  }
  return (
    <div className={styles.cardTeacher} ref={wrapperRef}>
      <button
        className={clsx(styles.header, { [styles.openHeader]: isOpen })}
        onClick={() => setIsOpen((v) => !v)}
      >
        <User user={user} />
        <div className={clsx(styles.arrow, { [styles.openArrow]: isOpen })} />
      </button>

      {isVisible && (
        <div
          className={clsx(styles.dropdown, {
            [styles.dropdownActive]: isAnimated,
          })}
          style={{
            transition: `max-height ${ANIMATION_DURATION}s ease, opacity ${ANIMATION_DURATION}s ease`,
          }}
        >
          {user.topics.map((topic) => (
            <Topic
              isLoading={isLoadingChoses}
              onChoose={onChoose}
              currentRole="student"
              key={topic.id}
              data={topic}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardTeacher;
