import React, { useEffect, useState } from 'react'
import { loadFirebase } from '../lib/firebase'

import styles from '../styles/skjermgrafikk.module.scss'

export default function Fullskjerm() {
  const firebase = loadFirebase()
  const db = firebase.firestore()

  const [mode, setMode] = useState('debatt')
  const [content, setContent] = useState('')
  const [nextData, setNextData] = useState({})
  const [talerlisteData, setTalerlisteData] = useState([])

  useEffect(() => {
    return db
      .collection('main')
      .doc('config')
      .onSnapshot((docSnapshot) => {
        setMode(docSnapshot.data().mode)
        setContent(docSnapshot.data().content)
      })
  }, [])

  useEffect(() => {
    return db
      .collection('talerliste')
      .doc('--config--')
      .onSnapshot((docSnapshot) => {
        const next = docSnapshot.data().next

        db.collection('talerliste')
          .doc(next.toString())
          .get()
          .then((doc) => {
            if (doc.exists) {
              setNextData(doc.data())
            } else {
              setNextData({ nummer: 'Talerlista er tom', navn: '', org: '' })
            }
          })

        db.collection('talerliste')
          .get()
          .then((snapshot) => {
            const talerliste = []

            snapshot.forEach((doc) => {
              if (doc.id != '--config--') {
                if (doc.id != next.toString()) {
                  const data = {}
                  data.nummer = doc.data().nummer
                  data.id = parseInt(doc.id)
                  talerliste.push(data)
                }
              }
            })
            setTalerlisteData(talerliste.sort((a, b) => a.id - b.id))
          })
      })
  }, [])

  if (mode == 'debatt') {
    return (
      <div className={styles.main}>
        {/* <div className={styles.talelisteDiv}>
          <p style={{ fontWeight: 700 }}>100</p>
          <p style={{ fontWeight: 700 }}>Daniel Martinsen</p>
          <p style={{ fontWeight: 400 }}>Ås Videregående Skole</p>
        </div> */}

        <div className={styles.talerDiv}>
          <p style={{ fontWeight: 700 }}>{nextData.nummer}</p>
          <p style={{ fontWeight: 700 }}>{nextData.navn}</p>
          <p style={{ fontWeight: 400 }}>{nextData.org}</p>
        </div>

        <div className={styles.talelisteDiv}>
          {talerlisteData.map((taler) => {
            return (
              <p key={taler.id} style={{ marginRight: 10 }}>
                {taler.nummer}
              </p>
            )
          })}
        </div>
      </div>
    )
  } else if (mode == 'pause') {
    return (
      <div className={styles.main}>
        <div className={styles.beskjedDiv}>{content}</div>
      </div>
    )
  }
}
