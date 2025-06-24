import MyInput from "@/components/ui/MyInputLogin/MyInputLogin";
import styles from "./page.module.scss";
import Link from "next/link";
import MyBtnLogin from "@/components/ui/MyBtn/MyBtn";
import Login from "@/components/Login/Login";

const page = () => {
  return (
    <main className={styles.main}>
      <Login />
    </main>
  );
};

export default page;
