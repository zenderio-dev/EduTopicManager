import clsx from 'clsx';
import styles from './MyBtn.module.scss';
interface MyBtnProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}
const MyBtn = ({className, onClick, children}:MyBtnProps) => {
    return (
        <button className={clsx(styles.myBtn, className)} onClick={onClick}>
            {children}
        </button>
    )
}

export default MyBtn;