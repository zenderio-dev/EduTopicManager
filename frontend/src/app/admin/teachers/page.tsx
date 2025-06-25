
import CardTopic from '@/components/ui/CardTopic/CardTopic';
import styles from './page.module.scss';
import TableTeacher from '@/components/screens/Tables/TableTeacher/TableTeacher';
const page = () => {
  return (
        <main className={styles.content}>
      <section className={styles.tableContainer}>
        
        <TableTeacher></TableTeacher>
      </section>
    </main>
  )
}

export default page