;
import styles from './DropList.module.scss';
import clsx from 'clsx';
import MyBtn from '../MyBtn/MyBtn';

type DropItem = { name: string, action: () => void;};

interface DropListProps{
    className?: string;
    elems: DropItem[];
    isOpen?: boolean;
}

const DropList = ({className, elems, isOpen=false}: DropListProps) => {

    return(
        <div className={clsx(styles.dropList, className, {[styles.open]: isOpen})}>
            <nav>

                <ul>
                    {
                        elems.map((elem, index)=>(
                        
                            <li key={index} className={styles.dropItem}>
                                <MyBtn className={styles.myBtn}  onClick={elem.action}>
                                    {elem.name}
                                </MyBtn>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    );
}

export default DropList;