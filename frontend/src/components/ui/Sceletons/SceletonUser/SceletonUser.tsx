import React from 'react'
import styles from './SceletonUser.module.scss'

const SceletonUser = () => {
  return (
    <div className={styles.userContainer}>
      <div className={styles.user}>
        <div className={styles.avatar}></div>
        <div className={styles.textContainer}>
          <div className={styles.name}></div>
          <div className={styles.role}></div>
        </div>
      </div>
    </div>
  )
}

export default SceletonUser
