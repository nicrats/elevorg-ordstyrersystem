import React from 'react'
import styles from '../styles/deltagere.module.scss'

import Layout from '../components/layout'
import Table from '../components/table'

export default function Deltagere() {
  const deltagere = [
    {
      skiltnummer: '1',
      navn: 'Sondre Vinding',
      organisasjon: 'Elevorganisasjonen i Oslo Vest',
      rolle: 'Delegat',
    },
    {
      skiltnummer: '2',
      navn: 'Daniel Martinsen',
      organisasjon: 'Elevorganisasjonen i Viken',
      rolle: 'Delegat',
    },
  ]

  return (
    <Layout>
      <div className={styles.actionButtons}>
        <button>Legg til en deltager</button>
        <button>Importer deltagere fra en .CSV fil</button>
      </div>

      <Table data={deltagere} />
    </Layout>
  )
}
