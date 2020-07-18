import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/layout.module.scss'

export default function Layout() {
  return (
    <div className={styles.container}>
      <Head>
        <title>EO Talerliste</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={styles.menugrid}>
          <Link href='/'>
            <div className={styles.card}>
              <h3>Hjem</h3>
            </div>
          </Link>

          <Link href='/deltagere'>
            <div className={styles.card}>
              <h3>Deltagere</h3>
            </div>
          </Link>

          <Link href='/debattkontroll'>
            <div className={styles.card}>
              <h3>Styr ordet</h3>
            </div>
          </Link>

          <Link href='/statistikk'>
            <div className={styles.card}>
              <h3>Statistikk</h3>
            </div>
          </Link>

          <Link href='/skjermgrafikk'>
            <div className={styles.card}>
              <h3>Fullskjerm</h3>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
