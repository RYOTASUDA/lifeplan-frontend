import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LifePlan</title>
        <meta name="description" content="LifePlan - Plan your life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">LifePlan</a>
        </h1>
      </main>
    </div>
  )
}

export default Home
