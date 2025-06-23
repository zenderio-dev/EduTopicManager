'use client';
import clsx from 'clsx';
import styles from './User.module.scss';
import DropList from '../ui/DropList/DropList';
import { useState } from 'react';
const User = ({className}:{className?:React.ReactNode}) => {
  const [isOpen, setIsopen] = useState<boolean>(false)
  function openDropList() {
    setIsopen(!isOpen);
  }
  return (
    <button onClick={openDropList} className={clsx(styles.user,className)}>
        <div className={styles.avatar}></div>
        <div className={styles.userContainer}>
            <div className={styles.name}>Клименко Лев</div>
            <div className={styles.role}>Администратор</div>
        </div>
        <DropList isOpen={isOpen} className={styles.dropList} elems={[{name:'Профиль', action:openDropList}, {name: 'Редактирование элементов пользователя', action:openDropList},{name:'установка ограничений',action:openDropList}] }/>
    </button>
  )
}

export default User