import React, { useEffect, useState } from 'react'
import { loadFirebase } from '../lib/firebase'

import styles from '../styles/skjermgrafikk.module.scss'

export default function Fullskjerm() {
  const firebase = loadFirebase()
  const db = firebase.firestore()

  const [mode, setMode] = useState('debatt')
  const [content, setContent] = useState('')
  const [nextData, setNextData] = useState([])
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
    return db.collection('talerliste').onSnapshot((docSnapshot) => {
      const talerliste = []

      docSnapshot.forEach((doc) => {
        if (doc.id != '--config--') {
          const data = doc.data()
          data.id = parseInt(doc.id)
          talerliste.push(data)
        }
      })
      const talerlisteSort = talerliste.sort((a, b) => a.id - b.id)
      const replikker = []

      if (talerlisteSort[0] != undefined) {
        setNextData([talerlisteSort[0]])

        const replikkData = talerlisteSort[0].replikk
        setReplikkData([])

        for (var replikk in replikkData) {
          if (replikk != 'config' && replikk != 'next') {
            replikker.push({
              id: replikkData[replikk],
              nummer: replikkData[replikk].nummer,
              navn: replikkData[replikk].navn,
              org: replikkData[replikk].org,
              active: replikkData[replikk].active,
            })
          }
        }
        setReplikkData(replikker)
      } else {
        setNextData([{ nummer: 'Talerlista er tom' }])
        setReplikkData([])
      }
      setTalerlisteData(talerlisteSort.slice(1))
    })
  }, [])

  if (mode == 'debatt') {
    return (
      <div className={styles.main}>
        {nextData.map((next) => (
          <div className={next.active ? styles.talerDiv : styles.talelisteDiv}>
            <p style={{ fontWeight: 700 }}>{next.nummer}</p>
            <p style={{ fontWeight: 700 }}>{next.navn}</p>
            <p style={{ fontWeight: 400 }}>{next.org}</p>
          </div>
        ))}

        {replikkData.map((replikk) => {
          return (
            <div
              className={replikk.active ? styles.talerDiv : styles.talelisteDiv}
              key={replikk.id}>
              <p style={{ fontWeight: 700, padding: 10, width: 150 }}>&rarr; {replikk.nummer}</p>
              <p style={{ fontWeight: 700, padding: 10 }}>{replikk.navn}</p>
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
      <>
        <div className={styles.main}>
          <div className={styles.beskjedDiv}>{content}</div>
        </div>

        <style jsx global>{`
          body {
            background-image: url('./pausebilde.jpg');
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
          }
        `}</style>
      </>
    )
  } else if (mode == 'hele') {
    return (
      <div className={styles.main}>
        <div className={styles.talelisteDiv} style={{ flexWrap: 'wrap' }}>
          <p style={{ marginRight: 10 }}>{nextData.nummer}</p>
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
  }
}
