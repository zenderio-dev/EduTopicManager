import clsx from 'clsx';
import styles from './MyBtn.module.scss';

const MyBtn = ({className}:{className?:React.ReactNode}) => {
  return (
    <button className={clsx(styles.myBtn, className)}>
        Войти
    </button>
  )
}

export default MyBtn