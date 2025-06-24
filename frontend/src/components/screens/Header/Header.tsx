import User from '@/components/User/User';
import styles from './Header.module.scss';

const Header = () => {
  const user:AdminType = {
    fullName:"Клименко Лев",
    id:55,
    role:'admin',
    profile:{
      
    }
  }
  return (
    <header className={styles.header}>
        
        <div className={styles.headerContainer}>
            <User user={user} className = {styles.user}></User>
        </div> 
    </header>
  )
}

export default Header