import clsx from 'clsx';
import styles from './User.module.scss';

const User = ({className}:{className?:React.ReactNode}) => {
  return (
    <div className={clsx(styles.user,className)}>
        <div className={styles.avatar}></div>
        <div className={styles.userContainer}>
            <div className={styles.name}>Клименко Лев</div>
            <div className={styles.role}>Администратор</div>
        </div>
        
    </div>
  )
}

export default User