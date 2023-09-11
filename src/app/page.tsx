import styles from './page.module.css'
import { getLetterboxdData } from './services/letterboxdService';
import { getMoviesList } from './services/metacriticService';

export default async function Home() {
  //let barbieData = getLetterboxdData('barbie');

  getMoviesList();

  return (
    <main className={styles.main}>
      {/* {(await barbieData).likesCount} */}
      <div className={styles.description}></div>
    </main>
  )
}
