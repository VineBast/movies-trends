import { Suspense } from 'react';
import { Card } from './components/Card';
import styles from './page.module.css'
import { Loading } from './components/Loading';

export default function Home() {

  return (
    <main className={styles.main}>
      <div>
        <Suspense fallback={<Loading />}>
          <Card />
        </Suspense>
      </div>
      <div className={styles.description}></div>
    </main>
  )
}
