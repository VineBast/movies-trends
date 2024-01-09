import React from 'react'
import { getTmdbMovieByName } from '../services/tmdbService';
import { getLetterboxdData } from '../services/letterboxdService';



const About = () => {
  getTmdbMovieByName("he+went+that+way");
  getLetterboxdData([{movieName: 'he+went+that+way'}, {movieName: 'test'}])

  return (
    <div>
      About
    </div>
  )
}

export default About