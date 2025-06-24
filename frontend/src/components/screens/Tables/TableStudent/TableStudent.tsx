"use client";
import React, { useState } from "react";
import type { PaginationState, ColumnDef } from "@tanstack/react-table";
import Table from "@/components/Table/Table";
import styles from "./TableStudent.module.scss";
import Pagination from "@/components/ui/Pagination/Pagination";
import MyBtn from "@/components/ui/MyBtn/MyBtn";
import DropListTrigger from "@/components/DropListTrigger/DropListTrigger";
import ModalEditStudent from "../../Modals/ModalEditStudent/ModalEditStudent";
import ModalDelete from "../../Modals/ModalDelete/ModalDelete";
import ModalCreateStudent from "../../Modals/ModalCreateStudent/ModalCreateStudent";
import ModalCreateUsersFromFile from "../../Modals/ModalCreateUsersFile/ModalCreateUsersFromFile";
// Тип

// Тестовые данные
const defaultData: StudentType[] = [
  {
    id: 11,
    fullName: "Клименко Лев Евгеньевич",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
  {
    id: 23,
    fullName: "Иванова Мария Александровна",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
  {
    id: 24,
    fullName: "Смирнов Артем Сергеевич",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
  {
    id: 25,
    fullName: "Кузнецова Алина Игоревна",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
  {
    id: 26,
    fullName: "Попов Даниил Викторович",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
  {
    id: 27,
    fullName: "Новикова Екатерина Павловна",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
  {
    id: 28,
    fullName: "Морозов Алексей Юрьевич",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
  {
    id: 29,
    fullName: "Соколова Дарья Владимировна",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
  {
    id: 30,
    fullName: "Васильев Илья Михайлович",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
  {
    id: 31,
    fullName: "Петрова Анна Николаевна",
    role: "student",
    profile: {
      group: "14121-дб",
      course: 1,
    },
  },
];

// Колонки
const columns: ColumnDef<StudentType>[] = [
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <DropListTrigger
          actions={[
            {
              name: "Редактировать пользователя",
              modal: ({ isOpen, onClose }) => (
                <ModalEditStudent isOpen={isOpen} onClose={onClose} />
              ),
            },
            {
              name: "Удалить пользователя",
              modal: ({ isOpen, onClose }) => (
                <ModalDelete
                  isOpen={isOpen}
                  onClose={onClose}
                  user={row.original}
                />
              ),
            },
          ]}
        >
          <button className={styles.btnDropListTable}>⋮</button>
        </DropListTrigger>
      );
    },
  },
  { accessorKey: "fullName", header: "Фио" },
  { accessorKey: "profile.group", header: "Группа" },
  { accessorKey: "profile.course", header: "Курс" },
];

const TableStudent = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const paginatedData = React.useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    return defaultData.slice(start, start + pagination.pageSize);
  }, [pagination]);

  return (
    <section className={styles.tableContainer}>
      <div className={styles.manageContainer}>
        <DropListTrigger
          actions={[
            {
              name: "Создать студента",
              modal: ({ isOpen, onClose }) => (
                <ModalCreateStudent isOpen={isOpen} onClose={onClose} />
              ),
            },
            {
              name: "Выгрузить с файла",
              modal: ({ isOpen, onClose }) => (
                <ModalCreateUsersFromFile isOpen={isOpen} onClose={onClose} />
              ),
            },
          ]}
        >
          <MyBtn className={styles.btn}>Создать</MyBtn>
        </DropListTrigger>
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          lengthPage={defaultData.length}
        />
      </div>
      <Table<StudentType> columns={columns} data={paginatedData} />
    </section>
  );
};

export default TableStudent;
