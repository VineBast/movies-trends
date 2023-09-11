import { Card } from './components/Card';
import styles from './page.module.css'
import { getLetterboxdData } from './services/letterboxdService';
import { getMoviesList } from './services/metacriticService';

export default function Home() {

  return (
    <main className={styles.main}>
      <div>
        <Card />
      </div>
      <div className={styles.description}></div>
    </main>
  )
}
