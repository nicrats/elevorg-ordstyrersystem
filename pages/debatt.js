import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { loadFirebase } from '../lib/firebase'
import * as moment from 'moment'

import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import styles from '../styles/debatt.module.scss'
import tableStyles from '../styles/table.module.scss'

export default function Debatt() {
  const firebase = loadFirebase()
  const db = firebase.firestore()

  const [mode, setMode] = useState('debatt')
  const [content, setContent] = useState('')
  const [nummer, setNummer] = useState('')
  const [nextData, setNextData] = useState([])
  const [replikkData, setReplikkData] = useState([])
  const [talerlisteData, setTalerlisteData] = useState([])
  const [ferdig, setFerdig] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    db.collection('main')
      .doc('config')
      .get()
      .then((doc) => {
        setMode(doc.data().mode)
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
            })
          }
        }
        setReplikkData(replikker)
      } else {
        setNextData([])
        setReplikkData([])

        reset()
        setIsActive(false)
      }

      setTalerlisteData(talerlisteSort.slice(1))

      const minutes = talerliste.length * 2 + replikker.length * 1
      const nowTime = new Date()
      const ferdigTime = moment(nowTime).add(minutes, 'm').toDate()
      setFerdig(
        ('0' + ferdigTime.getHours()).slice(-2) + ':' + ('0' + ferdigTime.getMinutes()).slice(-2)
      )
    })
  }, [])

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(0)
    setIsActive(false)
  }

  function talerInput() {
    if (nummer == '') {
      reset()
      setIsActive(true)

      db.collection('talerliste')
        .doc('--config--')
        .get()
        .then((doc) => {
          const next = doc.data().next
          const count = doc.data().count

          if (next <= count) {
            db.collection('talerliste')
              .doc(next.toString())
              .delete()
              .then(() => {
                db.collection('talerliste')
                  .doc('--config--')
                  .update({ next: next + 1 })
              })
          }
        })
    } else if (nummer == '++') {
      db.collection('talerliste')
        .doc(nextData[0].id.toString())
        .get()
        .then((doc) => {
          const count = doc.data().replikk.config
          const newCount = count + 1

          console.log(nextData[0])

          db.collection('talerliste')
            .doc(nextData[0].id.toString())
            .set(
              {
                replikk: {
                  config: newCount,
                  [newCount]: {
                    navn: nextData[0].navn,
                    nummer: nextData[0].nummer,
                    org: nextData[0].org,
                  },
                },
              },
              { merge: true }
            )
        })

      setNummer('')
    } else if (nummer.charAt(0) == '+') {
      db.collection('deltagere')
        .doc(nummer.substr(1).toString())
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data()

            db.collection('talerliste')
              .doc(nextData[0].id.toString())
              .get()
              .then((doc) => {
                const count = doc.data().replikk.config
                const newCount = count + 1

                db.collection('talerliste')
                  .doc(nextData[0].id.toString())
                  .set(
                    {
                      replikk: {
                        config: newCount,
                        [newCount]: {
                          navn: userData.navn,
                          nummer: userData.nummer,
                          org: userData.organisasjon,
                        },
                      },
                    },
                    { merge: true }
                  )
              })
          }
        })

      setNummer('')
    } else {
      if (talerlisteData.length == 0) {
        setIsActive(true)
      }

      db.collection('deltagere')
        .doc(nummer.toString())
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data()

            db.collection('talerliste')
              .doc('--config--')
              .get()
              .then((doc) => {
                const count = doc.data().count

                db.collection('talerliste')
                  .doc((count + 1).toString())
                  .set({
                    navn: userData.navn,
                    nummer: userData.nummer,
                    org: userData.organisasjon,
                    replikk: { config: 0 },
                  })
                  .then(() => {
                    db.collection('talerliste')
                      .doc('--config--')
                      .update({ count: count + 1 })
                  })
              })
          }
        })
      setNummer('')
    }
  }

  const handleChange = (event) => {
    setMode(event.target.value)
    db.collection('main').doc('config').update({ mode: event.target.value })
  }

  function updateContent() {
    db.collection('main').doc('config').update({ content: content })
  }

  return (
    <Layout>
      <div className={styles.modeSelect}>
        <FormControl>
          <Select value={mode} onChange={handleChange} displayEmpty>
            <MenuItem value={'debatt'}>Modus: Debatt</MenuItem>
            <MenuItem value={'pause'}>Modus: Pause/Beskjed</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={styles.content}>
        <div className={styles.sideDiv}>
          <input
            type='text'
            className={styles.talerInput}
            placeholder='Neste taler'
            value={nummer}
            onChange={(e) => setNummer(e.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                talerInput()
              }
            }}
          />

          <div className={styles.timeDiv}>
            <p>FERDIG OMTRENT:</p>
            <h1>{ferdig}</h1>

            <hr />

            <p>TIDSBRUK:</p>
            <h1>{seconds} sekunder</h1>
            <button onClick={toggle}> {isActive ? 'Pause' : 'Start'}</button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>

        <div className={styles.mainContent}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className={tableStyles.tableHeader}>
                <TableRow>
                  <TableCell>Skiltnummer</TableCell>
                  <TableCell>Navn</TableCell>
                  <TableCell>Organisasjon</TableCell>
                </TableRow>
              </TableHead>

              <TableBody className={styles.tableBody}>
                {nextData.map((next) => (
                  <TableRow key={next.id}>
                    <TableCell>{next.nummer}</TableCell>
                    <TableCell>{next.navn}</TableCell>
                    <TableCell>{next.org}</TableCell>
                  </TableRow>
                ))}

                {replikkData.map((replikk) => (
                  <TableRow key={replikk.id} className={styles.replikkBody}>
                    <TableCell>&rarr; {replikk.nummer}</TableCell>
                    <TableCell>{replikk.navn}</TableCell>
                    <TableCell>{replikk.org}</TableCell>
                  </TableRow>
                ))}

                {talerlisteData.map((taler) => (
                  <TableRow key={taler.id}>
                    <TableCell>{taler.nummer}</TableCell>
                    <TableCell>{taler.navn}</TableCell>
                    <TableCell>{taler.org}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <textarea
            className={styles.beskjedArea}
            placeholder='Beskjed...'
            onChange={(e) => setContent(e.target.value)}></textarea>
          <button className={styles.button} onClick={() => updateContent()}>
            Lagre og vis
          </button>
        </div>
      </div>
    </Layout>
  )
}
