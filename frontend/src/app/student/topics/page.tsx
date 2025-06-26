
import TopicWatch from '@/components/TopicWatch/TopicWatch';
import styles from './page.module.scss'

import TopicManage from '@/components/screens/TopicManage/TopicManage';

const page = async () => {

  
  return (
    <main className={styles.content}>
      <section className={styles.contentContainer}>
        <TopicWatch></TopicWatch>
        
      </section>
    </main>
  );
  
}

export default page