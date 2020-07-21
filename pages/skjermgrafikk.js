import React from 'react'

import styles from '../styles/skjermgrafikk.module.scss'

export default function Fullskjerm() {
  return (
    <div className={styles.main}>
      <div className={styles.beskjedDiv}>Pause frem til 12:00</div>

      <div className={styles.talerDiv}>100 Daniel Martinsen Ås Videregående</div>
      <div className={styles.talelisteDiv}>400 150 345 651 363 545 485</div>
    </div>
  )
}
