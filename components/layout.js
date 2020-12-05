import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/layout.module.scss'

export default function Layout({ user, loading = false, children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>EO Ordstyrersystem</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {!user && (
        <main>
          <div className={styles.menugrid}>
            <Link href='/'>
              <div className={styles.card}>
                <h3>Hjem</h3>
              </div>
            </Link>

            <Link href='/api/login'>
              <div className={styles.card}>
                <h3>Logg inn</h3>
              </div>
            </Link>
          </div>
        </main>
      )}

      {user && (
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

            <Link href='/debatt'>
              <div className={styles.card}>
                <h3>Styr ordet</h3>
              </div>
            </Link>

            <Link href='/skjermgrafikk'>
              <div className={styles.card}>
                <h3>Fullskjerm</h3>
              </div>
            </Link>

            <Link href='/api/logout'>
              <div className={styles.card}>
                <h3>Logg ut</h3>
              </div>
            </Link>
          </div>

          <div style={{ marginTop: '3rem' }}></div>

          {children}
        </main>
      )}
    </div>
  )
}
