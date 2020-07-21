import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { loadFirebase } from '../lib/firebase'

import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../styles/debatt.module.scss'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    margin: 0,
  },
}))

export default function Debatt() {
  const firebase = loadFirebase()
  const db = firebase.firestore()

  useEffect(() => {
    db.collection('main')
      .doc('config')
      .get()
      .then((doc) => {
        setMode(doc.data().mode)
      })
  }, [])

  const [mode, setMode] = useState('debatt')
  const [content, setContent] = useState('')
  const classes = useStyles()

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
        <FormControl className={classes.formControl}>
          <Select value={mode} onChange={handleChange} displayEmpty>
            <MenuItem value={'debatt'}>Modus: Debatt</MenuItem>
            <MenuItem value={'pause'}>Modus: Pause/Beskjed</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={styles.content}>
        <div className={styles.sideDiv}>
          <input type='text' className={styles.talerInput} placeholder='Neste taler' />

          <div className={styles.timeDiv}>
            <p>FERDIG OMTRENT:</p>
            <h1>23:10</h1>

            <hr />

            <p>TIDSBRUK:</p>
            <h1>0m 3sek</h1>
          </div>
        </div>

        <div className={styles.mainContent}>
          <h1>Table her</h1>
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
