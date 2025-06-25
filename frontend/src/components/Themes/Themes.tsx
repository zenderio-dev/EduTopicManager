import Theme from '../ui/Theme/Theme'
import styles from './Themes.module.scss'



const Themes = ({data}:{data:ThemeType[]}) => {

  return (
    <div className={styles.themesContainer}>
        {
            data.map((elem, id)=>(
                <Theme currentRole="teacher" key={id} data={elem}/>
            ))
        }
    </div>
  )
}

export default Themes