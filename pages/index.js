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
        <h1 className={styles.title}>EO Talerliste system</h1>

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

          <Link href='/skjermgrafikk'>
            <div className={styles.card}>
              <h3>Fullskjerm &rarr;</h3>
              <p>Fullskjerms grafikk.</p>
            </div>
          </Link>
        </div>
        <main>
          <h2 className={styles.description}>Eksterne kilder</h2>
          <div className={styles.grid}>
            <a className={styles.a} href='https://github.com/danielmartinsen/elevorg-ordstyrersystem'>
                <div className={styles.card}>
                  <h3>Github &rarr;</h3>
                  <p>Se koden bak prosjektet.</p>
                </div>
              </a>
              <a className={styles.a} href='https://elev.no'>
                <div className={styles.card}>
                  <h3>Elevorganisasjonen &rarr;</h3>
                  <p>Les mer om organisasjonen.</p>
                </div>
              </a>
            </div>
        </main>
      </main>
    </div>
  )
}
