import MyInput from '@/components/ui/MyInput/MyInput';
import styles from './page.module.scss';
import Link from 'next/link';
import MyBtn from '@/components/ui/MyBtn/MyBtn';

const page = () => {
  return (
    <main className={styles.main}>
        <form className={styles.loginForm}>
            <h1>Добро пожаловать</h1>
            <div className={styles.inputContainer}>
                <MyInput label={'Логин'} type='text'/>
                <MyInput label={'Пароль'} type={'password'}/>
            </div>
            <Link className={styles.forgot} href={'#'}>Забыли логин или пароль?</Link>
            <MyBtn/>
        </form>
    </main>
  )
}

export default page