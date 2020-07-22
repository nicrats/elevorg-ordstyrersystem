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
  const [replikkData, setReplikkData] = useState([])

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

              const replikkData = doc.data().replikk
              const replikker = []

              for (var replikk in replikkData) {
                if (replikk != 'config' && replikk != 'next') {
                  replikker.push({
                    id: replikkData[replikk],
                    nummer: replikkData[replikk].nummer,
                    navn: replikkData[replikk].navn,
                    org: replikkData[replikk].org,
                  })
                  setReplikkData(replikker)
                }
              }
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
        <div className={styles.talerDiv}>
          <p style={{ fontWeight: 700 }}>{nextData.nummer}</p>
          <p style={{ fontWeight: 700 }}>{nextData.navn}</p>
          <p style={{ fontWeight: 400 }}>{nextData.org}</p>
        </div>

        {replikkData.map((replikk) => {
          return (
            <div className={styles.talelisteDiv} key={replikk.id}>
              <p style={{ fontWeight: 700, padding: 10, width: 150 }}>&rarr; {replikk.nummer}</p>
              <p style={{ fontWeight: 700, padding: 10, minWidth: 400 }}>{replikk.navn}</p>
              <p style={{ fontWeight: 400, padding: 10 }}>{replikk.org}</p>
            </div>
          )
        })}

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
