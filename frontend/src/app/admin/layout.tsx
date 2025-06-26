'use client'


import Sidebar from "@/components/screens/Sidebar/Sidebar";
import styles from "./layout.module.scss";
import Header from "@/components/screens/Header/Header";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
    <div>
        
      <Sidebar
        nav={[
          { name: "Преподаватели", href: "/admin/teachers" },
          { name: "Студенты", href: "/admin/students" },
          { name: "работы", href: "/admin/works" },
        ]}
      />
      <div className={styles.mainContent}>
        <Header/>
        {children}
      </div>
    
    </div>
    </ProtectedRoute>
  );
};

export default LayoutContent;
