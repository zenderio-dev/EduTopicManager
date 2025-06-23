import clsx from "clsx";
import styles from "./MyLink.module.scss";
import Link from "next/link";
interface LinkProps{
    children:React.ReactNode, 
    className?:string,
    isActive?:boolean,
    href:string,
}
const MyLink = ({children, className, isActive = false, href, ...props}:LinkProps) =>{
    return(
        <Link {...props} className={clsx(styles.link, className, {[styles.activeLink]:isActive})} href={href}>
            {children}
        </Link>
    )
}
export default MyLink;
