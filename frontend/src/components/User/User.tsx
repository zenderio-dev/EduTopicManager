
import clsx from "clsx";
import styles from "./User.module.scss";
import { formatName } from "@/utils";
import SceletonUser from "../ui/Sceletons/SceletonUser/SceletonUser";


interface TypeProps{
  className?:React.ReactNode,
  user:AdminType|StudentType|TeacherType|undefined
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
          <div className={styles.role}>{showRoles[user.role]}</div>
        </div>
      </button>
    </div>
  );
};

export default User;
