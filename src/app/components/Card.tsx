import { getDataFromTmdb } from "../utils/formatData";
import { getLetterboxdData } from "../services/letterboxdService";

export const Card = async () => {
  const data = (await getLetterboxdData(await getDataFromTmdb())).sort((a: any, b: any) => ((b.watchesCount - a.watchesCount) + (b.likesCount - a.likesCount)));

  return (
    <div>
      <ol>
        {(await data).map((movie, index) => {
          return (
            <li key={index}>
              <h2 className="text-2xl mb-4 font-bold">{movie.movieName}</h2>
              <div className="stats shadow mb-5" style={{ overflowX: 'initial' }}>
                <div className="avatar indicator">
                  <span className="text-xl font-bold indicator-item badge badge-secondary">{index + 1}</span>
                  <div className="w-32 rounded">
                    <img src={movie.image} />
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div className="stat-title">Views</div>
                  <div className="stat-value text-secondary">{movie.watchesCount}</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  </div>
                  <div className="stat-title">Total Likes</div>
                  <div className="stat-value text-primary">{movie.likesCount}</div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div >
  )
}