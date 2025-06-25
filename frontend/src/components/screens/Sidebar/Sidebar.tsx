"use client";

import Link from "next/link";
import styles from "./SideBar.module.scss";
import { PiStudentFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useWidthScreen } from "@/shared/hooks/useWidthScreen";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import MyLink from "@/components/ui/MyLink/MyLink";
import { useRouter } from "next/navigation";
import { removeAuthToken } from "@/utils/auth";
import { useDispatch } from "react-redux";
import { Api } from "@/services/auth/baseApi";
import MyBtn from "@/components/ui/MyBtn/MyBtn";

interface Props {
  nav: {
    name: string;
    href: string;
  }[];
}
const Sidebar = ({ nav }: Props) => {
  const widthScreen = useWidthScreen();
  const pathName = usePathname();

  const dispatch = useDispatch();
  const router = useRouter();

  const [activeSidebar, setActiveSidebar] = useState<boolean>(
    widthScreen > 768
  );

  useEffect(() => {
    setActiveSidebar(widthScreen > 768);
  }, [widthScreen]);

  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar);
  };
  const logout = () => {
    removeAuthToken();
    dispatch(Api.util.resetApiState());
    router.replace("/login");
  };
  return (
    <>
      <button
        onClick={toggleSidebar}
        style={{ display: widthScreen > 768 ? "none" : "block" }}
        className={styles.hamburgerHeader}
      >
        <RxHamburgerMenu size={30} />
      </button>
      <div
        className={clsx(styles.sidebar, {
          [styles.sidebarClose]: !activeSidebar,
        })}
      >
        <div className={styles.sidebarContainer}>
          <div className={styles.header}>
            <Link className={styles.logoLink} href="/">
              <PiStudentFill size={50} />
              <h1 className={styles.logoText}>MyApp</h1>
            </Link>
            <button
              onClick={toggleSidebar}
              style={{ display: widthScreen > 768 ? "none" : "block" }}
              className={styles.hamburgerSideBar}
            >
              <RxHamburgerMenu size={30} />
            </button>
          </div>
          <main className={styles.content}>
            <nav>
              <ul className={styles.navList}>
                {nav.map((item, index) => {
                  console.log(item.href, pathName);
                  return (
                    <li key={index}>
                      <MyLink
                        isActive={item.href === pathName}
                        href={item.href}
                      >
                        {item.name}
                      </MyLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <MyBtn
              className={styles.btnLogout}
              onClick={() => {
                logout();
              }}
            >
              Выйти
            </MyBtn>
          </main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
