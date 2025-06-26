"use client";
import React, { useState } from "react";
import type { PaginationState, ColumnDef } from "@tanstack/react-table";
import Table from "@/components/Table/Table";
import styles from "./TableTeacher.module.scss";
import Pagination from "@/components/ui/Pagination/Pagination";
import MyBtn from "@/components/ui/MyBtn/MyBtn";
import DropListTrigger from "@/components/DropListTrigger/DropListTrigger";
import ModalEditStudent from "../../Modals/ModalEditStudent/ModalEditStudent";
import ModalDelete from "../../Modals/ModalDelete/ModalDelete";
import ModalCreateStudent from "../../Modals/ModalCreateStudent/ModalCreateStudent";
import ModalCreateUsersFromFile from "../../Modals/ModalCreateUsersFile/ModalCreateUsersFromFile";
import {
  useAllStudentsQuery,
  useAllTeachersQuery,
} from "@/services/api/userApi";
import Loader from "@/components/ui/Loader/Loader";
import ModalCreateTeacher from "../../Modals/ModalCreateTeacher/ModalCreateTeacher";
import ModalEditTeacher from "../../Modals/ModalEditTeacher/ModalEditTeacher";
import { TeacherType } from "@/types/userTypes";

const columns: ColumnDef<TeacherType>[] = [
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DropListTrigger
        actions={[
          {
            name: "Редактировать пользователя",
            modal: ({ isOpen, onClose }) => (
              <ModalEditTeacher
                teacher={row.original}
                isOpen={isOpen}
                onClose={onClose}
              />
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
    ),
  },
  { accessorKey: "fullname", header: "ФИО" },
  { accessorKey: "academicTitle", header: "Ученое звание" },
  { accessorKey: "academicDegree", header: "Ученая степень" },
  { accessorKey: "jobTitle", header: "Должность" },
];

const TableTeacher = () => {
  const { data: allTeachers = [], isLoading, error } = useAllTeachersQuery();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const paginatedData = React.useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    return allTeachers.slice(start, start + pagination.pageSize);
  }, [allTeachers, pagination]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.tableContainer}>
      <div className={styles.manageContainer}>
        <DropListTrigger
          actions={[
            {
              name: "Создать преподавателя",
              modal: ({ isOpen, onClose }) => (
                <ModalCreateTeacher isOpen={isOpen} onClose={onClose} />
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
          lengthPage={allTeachers.length}
        />
      </div>

      <Table<TeacherType> columns={columns} data={paginatedData} />
    </section>
  );
};

export default TableTeacher;
