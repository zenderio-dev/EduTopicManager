


import Sidebar from "@/components/screens/Sidebar/Sidebar";
import styles from "./layout.module.scss";
import Header from "@/components/screens/Header/Header";
const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        
      <Sidebar
        nav={[
          { name: "Темы", href: "/teacher/themes" },
         
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
