import User from '@/components/User/User';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
        
        <div className={styles.headerContainer}>
            <User className = {styles.user}></User>
        </div> 
    </header>
  )
}

export default Header