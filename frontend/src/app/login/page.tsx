
import styles from './page.module.scss'
import Login from "@/components/Login/Login";

const page = () => {
  return (
    <main className={styles.main}>
      <Login />
    </main>
  );
};

export default page;
