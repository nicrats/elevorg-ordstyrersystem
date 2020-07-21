import React from 'react'

import styles from '../styles/skjermgrafikk.module.scss'

export default function Fullskjerm() {
  return (
    <div className={styles.main}>
      <div className={styles.beskjedDiv}>Pause frem til 12:00</div>

      <div className={styles.talelisteDiv}>
        <p style={{ fontWeight: 700 }}>100</p>
        <p style={{ fontWeight: 700 }}>Daniel Martinsen</p>
        <p style={{ fontWeight: 400 }}>Ås Videregående Skole</p>
      </div>

      <div className={styles.talerDiv}>
        <p style={{ paddingRight: 35, fontWeight: 700 }}>&rarr; 100</p>
        <p style={{ paddingRight: 35, fontWeight: 700 }}>Daniel Martinsen</p>
        <p style={{ paddingRight: 35, fontWeight: 400 }}>Ås Videregående</p>
      </div>

      <div className={styles.talelisteDiv}>
        <p>400 150 345 651 363 545 485</p>
      </div>
    </div>
  )
}
