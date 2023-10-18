import { Suspense } from 'react';
import { Card } from './components/Card';
import styles from './page.module.css'
import { Loading } from './components/Loading';
import Image from 'next/image';
import trends from "/public/trends.png";

export default function Home() {

  return (
    <main className={styles.main}>
      <Image className="baseCardImage" width={230} height={230} src={trends} alt="Colored oscar" />
      <div>
        <Suspense fallback={<Loading />}>
          <Card />
        </Suspense>
      </div>
      <div className={styles.description}></div>
    </main>
  )
}
