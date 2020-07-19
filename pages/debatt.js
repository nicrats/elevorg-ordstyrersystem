import React, { useState } from 'react'
import Layout from '../components/layout'

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
  const [age, setAge] = useState('debatt')
  const classes = useStyles()

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  return (
    <Layout>
      <div className={styles.modeSelect}>
        <FormControl className={classes.formControl}>
          <Select value={age} onChange={handleChange} displayEmpty>
            <MenuItem value={'debatt'}>Modus: Debatt</MenuItem>
            <MenuItem value={'pause'}>Modus: Pause/Beskjed</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={styles.content}>
        <input type='text' className={styles.talerInput} placeholder='Neste taler' />

        <div className={styles.timeDiv}>
          <p>FERDIG OMTRENT:</p>
          <h1>23:10</h1>

          <hr />

          <p>TIDSBRUK:</p>
          <h1>0m 3sek</h1>
        </div>
      </div>
    </Layout>
  )
}
