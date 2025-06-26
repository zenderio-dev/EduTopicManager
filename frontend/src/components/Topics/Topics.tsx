import { FullTopicType, TopicType } from '@/types/userTypes'
import Topic from '../ui/Topic/Topic'
import styles from './Topics.module.scss'




const Topics = ({data}:{data:FullTopicType[]}) => {

  return (
    <div className={styles.topicsContainer}>
        {
            data.map((elem, id)=>(
                <Topic currentRole="teacher" key={id} data={elem}/>
            ))
        }
    </div>
  )
}

export default Topics