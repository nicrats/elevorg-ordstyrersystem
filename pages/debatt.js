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
  const [talerlisteData, setTalerlisteData] = useState([])
  const [ferdig, setFerdig] = useState('')

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
          if (doc.id != next.toString()) {
            const data = doc.data()
            data.id = parseInt(doc.id)
            talerliste.push(data)
          }
        }
      })
      setTalerlisteData(talerliste.sort((a, b) => a.id - b.id))

      const minutes = talerliste.length * 2
      const nowTime = new Date()
      const ferdigTime = moment(nowTime).add(minutes, 'm').toDate()
      setFerdig(
        ('0' + ferdigTime.getHours()).slice(-2) + ':' + ('0' + ferdigTime.getMinutes()).slice(-2)
      )
    })
  }, [])

  function talerInput() {
    if (nummer == '') {
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
    } else {
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
                  .set({ navn: userData.navn, nummer: userData.nummer, org: userData.organisasjon })
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

            {/* <hr />

            <p>TIDSBRUK:</p>
            <h1>{counter} sekunder</h1> */}
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
              <TableBody className={tableStyles.tableBody}>
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
