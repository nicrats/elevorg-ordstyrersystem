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
              <p>Administrer deltagere.</p>
            </div>
          </Link>

          <Link href='/debatt'>
            <div className={styles.card}>
              <h3>Styr ordet &rarr;</h3>
              <p>Styr ordet og skjermen.</p>
            </div>
          </Link>

          <Link href='/skjermgrafikk'>
            <div className={styles.card}>
              <h3>Fullskjerm &rarr;</h3>
              <p>Fullskjerms-grafikk for OBS.</p>
            </div>
          </Link>
        </div>

        <div>
          <p>Kontakt <a href="mailto:daniel.martinsen@elev.no">Daniel Martinsen</a> (EO Viken) for innloggings-detaljer.</p>
        </div>

        <div className={styles.footer}>
          <a className={styles.a} href='https://github.com/danielmartinsen/elevorg-ordstyrersystem'>
            Se koden bak prosjektet &rarr;
          </a>
          <a className={styles.a} href='https://elev.no'>
            Les mer om Elevorganisasjonen &rarr;
          </a>
        </div>
      </main>
    </div>
  )
}
