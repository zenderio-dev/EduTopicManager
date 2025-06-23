import clsx from 'clsx';
import styles from './MyBtnLogin.module.scss';

const MyBtnLogin = ({className, children}:{className?:string, children:React.ReactNode}) => {
  return (
    <button className={clsx(styles.myBtn, className)}>
        {children}
    </button>
  )
}

export default MyBtnLogin