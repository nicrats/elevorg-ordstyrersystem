import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import styles from '../styles/table.module.scss'
import Row from './tableRow'

export default function DeltagerTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className={styles.tableHeader}>
          <TableRow>
            <TableCell>Skiltnummer</TableCell>
            <TableCell>Navn</TableCell>
            <TableCell>Organisasjon</TableCell>
            <TableCell>Rolle</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody className={styles.tableBody}>
          {data.map((row) => (
            <Row row={row} key={row.navn} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
