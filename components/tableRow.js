import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import styles from '../styles/table.module.scss'

// import { loadFirebase } from '../lib/firebase'

export default function Row({ row }) {
  // const firebase = loadFirebase()
  // const db = firebase.firestore()

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{row.skiltnummer}</TableCell>
        <TableCell>{row.navn}</TableCell>
        <TableCell>{row.organisasjon}</TableCell>
        <TableCell>{row.rolle}</TableCell>
        <TableCell>
          <button className={styles.button}>Endre</button>
          <button className={styles.button}>Slett</button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
