
import clsx from "clsx";
import styles from "./User.module.scss";
import { formatName } from "@/utils";
import SceletonUser from "../ui/Sceletons/SceletonUser/SceletonUser";
import { AdminType, StudentType, TeacherType } from "@/types/userTypes";


interface TypeProps{
  className?:React.ReactNode,
  user:{fullname:string, role?:"admin" | "student" | "teacher"} | AdminType | StudentType | TeacherType | undefined
}
const showRoles = {
  admin:'Администратор',
  student:'Студент',
  teacher:'Преподаватель'
}
const User = ({ className, user }: TypeProps) => {
  console.log(user)
  if(user === undefined)
    return(<SceletonUser/>)
  return (
    <div className={styles.userContainer}>
      <button  className={clsx(styles.user, className)}>
        <div className={styles.avatar}></div>
        <div className={styles.userContainer}>
          <div className={styles.name}>{formatName(user.fullname, 'FLName')}</div>
          <div className={styles.role}>{user.role? showRoles[user.role]:null}</div>
        </div>
      </button>
    </div>
  );
};

export default User;
