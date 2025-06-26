"use client";
import User from "@/components/User/User";
import styles from "./Header.module.scss";
import { useMyAccountQuery } from "@/services/api/userApi";

const Header = () => {
  const { data } = useMyAccountQuery();
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <User user={data} className={styles.user}></User>
      </div>
    </header>
  );
};

export default Header;
