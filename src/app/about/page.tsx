import React from 'react'
import { getTmdbMovieByName } from '../services/tmdbService';
import { getLetterboxdData } from '../services/letterboxdService';



const About = () => {
  getTmdbMovieByName("taylor-swift--the-eras-tour");
  getLetterboxdData([{movieName: 'taylor-swift--the-eras-tour'}, {movieName: 'test'}])

  return (
    <div>
      About
    </div>
  )
}

export default About