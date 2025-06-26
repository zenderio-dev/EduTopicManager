"use client";

import styles from "./Table.module.scss";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";


type TableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
};

const Table = <T,>({
  columns,
  data,
}: TableProps<T>) => {
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
   
  });
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.head}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={styles.th}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default Table;
