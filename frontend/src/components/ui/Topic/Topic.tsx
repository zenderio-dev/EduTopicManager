// Topic.tsx
"use client";

import React, { useState } from "react";
import clsx from "clsx";

import { FullTopicType } from "@/types/userTypes";
import MyBtn from "../MyBtn/MyBtn";
import User from "@/components/User/User";
import DropListTrigger from "@/components/DropListTrigger/DropListTrigger";
import ModalDeleteTopic from "@/components/screens/Modals/ModalDeleteTopic/ModalDeleteTopic";


import styles from "./Topic.module.scss";
import ModalEditTopic from "@/components/screens/Modals/ModalEditTopic/ModalEditToic";

interface TopicProps {
  data: FullTopicType;
  currentRole: "student" | "teacher" | "admin";
  isLoading?: boolean;
  onChoose?: (themeId: number) => void;
  onAccept?: (themeId: number) => void;
  onDecline?: (themeId: number) => void;
}

const Topic: React.FC<TopicProps> = ({
  data,
  currentRole,
  onChoose,
  onAccept,
  onDecline,
  isLoading = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Мапа для типа работы
  const typeWorkMap: Record<FullTopicType["type_work"], string> = {
    coursework: "Курсовая работа",
    diploma:    "Дипломная работа",
    both:       "Курсовая и дипломная работа",
  };

  const renderActions = () => {
    if (currentRole === "student" && data.status === "ожидается студент") {
      return (
        <MyBtn
          isLoading={isLoading}
          onClick={() => onChoose?.(data.id)}
          className={styles.chooseBtn}
        >
          Выбрать
        </MyBtn>
      );
    }
    if (currentRole === "teacher" && data.status === "ожидает подтверждения") {
      return (
        <div className={styles.actions}>
          <MyBtn
            onClick={() => onAccept?.(data.id)}
            className={styles.acceptBtn}
            isLoading={isLoading}
          >
            Принять
          </MyBtn>
          <MyBtn
            onClick={() => onDecline?.(data.id)}
            className={styles.declineBtn}
            isLoading={isLoading}
          >
            Отклонить
          </MyBtn>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.mainInfo}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.type}>
            Тип работы: {typeWorkMap[data.type_work]}
          </div>
        </div>
        <div
          className={clsx(
            styles.status,
            data.status === "ожидается студент" && styles.waiting_student,
            data.status === "ожидает подтверждения" && styles.waiting_confirm,
            data.status === "подтверждено" && styles.confirmed
          )}
        >
          {data.status}
        </div>
      </div>

      {data.student && (
        <div className={styles.studentRow}>
          <User user={data.student} />
        </div>
      )}

      <div className={clsx(styles.description, expanded && styles.expanded)}>
        {data.description}
      </div>
      {data.description.length > 100 && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className={styles.toggleBtn}
        >
          {expanded ? "Скрыть" : "Подробнее"}
        </button>
      )}

      <div className={styles.footer}>
        <div className={styles.dropListContainer}>
          {currentRole === "teacher" && (
            <DropListTrigger
              positionList="left"
              actions={[
                {
                  name: "Редактировать тему",
                  modal: ({ isOpen, onClose }) => (
                    <ModalEditTopic
                      data={data}
                      isOpen={isOpen}
                      onClose={onClose}
                    />
                  ),
                },
                {
                  name: "Удалить тему",
                  modal: ({ isOpen, onClose }) => (
                    <ModalDeleteTopic
                      data={data}
                      isOpen={isOpen}
                      onClose={onClose}
                    />
                  ),
                },
              ]}
            >
              <button className={styles.moreBtn}>⋮</button>
            </DropListTrigger>
          )}
        </div>
        {renderActions()}
      </div>
    </div>
  );
};

export default Topic;
