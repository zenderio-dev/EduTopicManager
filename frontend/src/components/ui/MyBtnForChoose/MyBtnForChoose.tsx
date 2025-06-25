import clsx from 'clsx';
import styles from './MyBtnForChoose.module.scss';
interface MyBtnProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}
const MyBtnForChoose = ({className, onClick, children, ...props}:MyBtnProps) => {
    return (
        <button {...props} type="button" className={clsx(styles.myBtn, className)} onClick={onClick}>
            {children}
        </button>
    )
}

export default MyBtnForChoose;