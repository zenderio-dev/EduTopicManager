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
import { useAllStudentsQuery } from "@/services/auth/userApi";
import Loader from "@/components/ui/Loader/Loader";


const columns: ColumnDef<StudentType>[] = [
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DropListTrigger
        actions={[
          {
            name: "Редактировать пользователя",
            modal: ({ isOpen, onClose }) => (
              <ModalEditStudent student={row.original} isOpen={isOpen} onClose={onClose}  />
            ),
          },
          {
            name: "Удалить пользователя",
            modal: ({ isOpen, onClose }) => (
              <ModalDelete isOpen={isOpen} onClose={onClose} user={row.original} />
            ),
          },
        ]}
      >
        <button className={styles.btnDropListTable}>⋮</button>
      </DropListTrigger>
    ),
  },
  { accessorKey: "fullname", header: "ФИО" },
  { accessorKey: "group", header: "Группа" },
  { accessorKey: "course", header: "Курс" },
];

const TableStudent = () => {
 
  const { data: allStudents = [], isLoading, error } = useAllStudentsQuery();

  
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const paginatedData = React.useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    return allStudents.slice(start, start + pagination.pageSize);
  }, [allStudents, pagination]);


  if (isLoading) {
    return <Loader/>;
  }
  if (error) {
    return <div>Ошибка загрузки: {(error as any).message}</div>;
  }

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
          lengthPage={allStudents.length}
        />
      </div>

      <Table<StudentType> columns={columns} data={paginatedData} />
    </section>
  );
};

export default TableStudent;
