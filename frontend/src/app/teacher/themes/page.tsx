
import styles from './page.module.scss'

import ThemeManage from '@/components/screens/ThemeManage/ThemeManage';

const page = async () => {

  
  return (
    <main className={styles.content}>
      <section className={styles.contentContainer}>
        <ThemeManage/>
        
      </section>
    </main>
  );
  
}

export default page