import styles from './Theme.module.scss'
import { useState } from 'react'

import clsx from 'clsx'
import MyBtn from '../MyBtn/MyBtn'
import User from '@/components/User/User'

interface ThemeProps {
  data: ThemeType
  currentRole: 'student' | 'teacher' | 'admin'
  onChoose?: (themeId: number) => void
  onAccept?: (themeId: number) => void
  onDecline?: (themeId: number) => void
}

const Theme = ({ data, currentRole, onChoose, onAccept, onDecline }: ThemeProps) => {
  const [expanded, setExpanded] = useState(false)

  const renderActions = () => {
    if (data.status === 'waiting_student') {
      if (currentRole === 'student') {
        return (
          <MyBtn onClick={() => onChoose?.(data.id)} className={styles.chooseBtn}>
            Выбрать
          </MyBtn>
        )
      }
      if (currentRole === 'teacher') {
        return (
          <div className={styles.actions}>
            <MyBtn onClick={() => onAccept?.(data.id)} className={styles.acceptBtn}>
              Принять
            </MyBtn>
            <MyBtn onClick={() => onDecline?.(data.id)} className={styles.declineBtn}>
              Отклонить
            </MyBtn>
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.mainInfo}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.type}>Тип работы: {data.type_work === 'coursework' ? 'Курсовая' : 'ВКР'}</div>
        </div>
        <div className={clsx(styles.status, styles[data.status])}>
          {data.status === 'waiting_student' ? 'Ожидает студента'
            : data.status === 'waiting_confirm' ? 'Ожидает подтверждения'
            : 'Подтверждена'}
        </div>
      </div>

      {data.student && (
        <div className={styles.studentRow}>
          <User user={data.student} />
        </div>
      )}

      <div className={clsx(styles.description, { [styles.expanded]: expanded })}>
        {data.description}
      </div>
      {data.description.length > 100 && (
        <button onClick={() => setExpanded(prev => !prev)} className={styles.toggleBtn}>
          {expanded ? 'Скрыть' : 'Подробнее'}
        </button>
      )}

      {renderActions()}
    </div>
  )
}

export default Theme
