import clsx from 'clsx';
import styles from './MyBtn.module.scss';
import Loader from '../Loader/Loader';

interface MyBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean
}

const MyBtn = ({className, children,isLoading=false, ...props}:MyBtnProps) => {
  return (
    <button {...props} className={clsx(styles.myBtn, className)} disabled={isLoading || props.disabled}>
        {isLoading ? <Loader className={styles.loader} size={22}/> : children}
    </button>
  )
}

export default MyBtn