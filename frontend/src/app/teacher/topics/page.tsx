
import styles from './page.module.scss'

import TopicManage from '@/components/screens/TopicManage/TopicManage';

const page = async () => {

  
  return (
    <main className={styles.content}>
      <section className={styles.contentContainer}>
        <TopicManage/>
        
      </section>
    </main>
  );
  
}

export default page