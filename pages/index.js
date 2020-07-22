import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/index.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>EO Ordstyrersystem</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className={styles.title}>EO Ordstyrersystem</h1>

        <div className={styles.grid}>
          <Link href='/deltagere'>
            <div className={styles.card}>
              <h3>Deltagere &rarr;</h3>
              <p>Legg til, fjern og endre deltagere.</p>
            </div>
          </Link>

          <Link href='/debatt'>
            <div className={styles.card}>
              <h3>Styr ordet &rarr;</h3>
              <p>Styr ordet, og skjerm-grafikken.</p>
            </div>
          </Link>

          <Link href='/statistikk'>
            <div className={styles.card}>
              <h3>Statistikk &rarr;</h3>
              <p>Se dagens statistikk.</p>
            </div>
          </Link>

          <Link href='/skjermgrafikk'>
            <div className={styles.card}>
              <h3>Fullskjerm &rarr;</h3>
              <p>Fullskjerms grafikk.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
