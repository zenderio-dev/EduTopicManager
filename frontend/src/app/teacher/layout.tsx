import Sidebar from "@/components/screens/Sidebar/Sidebar";
import styles from "./layout.module.scss";
import Header from "@/components/screens/Header/Header";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <div>
        <Sidebar nav={[{ name: "Темы", href: "/teacher/themes" }]} />
        <div className={styles.mainContent}>
          <Header />
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default LayoutContent;
