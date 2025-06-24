import clsx from 'clsx';
import styles from './Pagination.module.scss'

interface PaginationProps{
    pagination:{pageIndex:number, pageSize:number},
    setPagination: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
    lengthPage:number,
    className?:string
    
}

const Pagination = ({pagination, setPagination, lengthPage, className}:PaginationProps) => {
  return (
     <div className={clsx(styles.pagination, className)}>
        <button
          onClick={() =>
            setPagination((p) => ({ ...p, pageIndex: p.pageIndex - 1 }))
          }
          disabled={pagination.pageIndex === 0}
        >
          ←
        </button>
        <span>{pagination.pageIndex + 1}</span>
        <button
          onClick={() =>
            setPagination((p) => ({ ...p, pageIndex: p.pageIndex + 1 }))
          }
          disabled={
            pagination.pageIndex >= lengthPage / pagination.pageSize - 1
          }
        >
          →
        </button>
      </div>
  )
}

export default Pagination