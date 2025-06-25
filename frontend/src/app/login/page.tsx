
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import styles from './page.module.scss'
import Login from "@/components/Login/Login";

const page = () => {
  return (
    <ProtectedRoute >

      <main className={styles.main}>
        <Login />
      </main>
    </ProtectedRoute>
  );
};

export default page;
