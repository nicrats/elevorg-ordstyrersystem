import React, { useEffect, useState } from 'react'
import { loadFirebase } from '../lib/firebase'

import styles from '../styles/skjermgrafikk.module.scss'

export default function Fullskjerm() {
  const firebase = loadFirebase()
  const db = firebase.firestore()

  const [mode, setMode] = useState('debatt')

  useEffect(() => {
    db.collection('main')
      .doc('config')
      .get()
      .then((doc) => {
        setMode(doc.data().mode)
      })
  }, [])

  if (mode == 'debatt') {
    return (
      <div className={styles.main}>
        <div className={styles.talelisteDiv}>
          <p style={{ fontWeight: 700 }}>100</p>
          <p style={{ fontWeight: 700 }}>Daniel Martinsen</p>
          <p style={{ fontWeight: 400 }}>Ås Videregående Skole</p>
        </div>

        <div className={styles.talerDiv}>
          <p style={{ fontWeight: 700 }}>&rarr; 100</p>
          <p style={{ fontWeight: 700 }}>Daniel Martinsen</p>
          <p style={{ fontWeight: 400 }}>Ås Videregående</p>
        </div>

        <div className={styles.talelisteDiv}>
          <p>400 150 345 651 363 545 485</p>
        </div>
      </div>
    )
  } else if ((mode = 'pause')) {
    return (
      <div className={styles.main}>
        <div className={styles.beskjedDiv}>Pause frem til 12:00</div>
      </div>
    )
  }
}
