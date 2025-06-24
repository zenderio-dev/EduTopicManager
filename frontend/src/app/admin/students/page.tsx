import Table from "@/components/Table/Table";
import styles from "./page.module.scss";
import TableStudent from "@/components/screens/Tables/TableStudent/TableStudent";

const page = () => {
  return (
    <main className={styles.content}>
      <section className={styles.tableContainer}>
        
        <TableStudent></TableStudent>
      </section>
    </main>
  );
};

export default page;
