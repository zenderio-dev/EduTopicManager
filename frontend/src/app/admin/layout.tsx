


import Sidebar from "@/components/screens/Sidebar/Sidebar";
import styles from "./layout.module.scss";
import Header from "@/components/screens/Header/Header";
const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        
      <Sidebar
        nav={[
          { name: "Преподаватели", href: "/admin/teachers" },
          { name: "Студенты", href: "/admin/students" },
          { name: "работа", href: "/admin/work" },
        ]}
      />
      <div className={styles.mainContent}>
        <Header/>
        {children}
      </div>
    
    </div>
  );
};

export default LayoutContent;
