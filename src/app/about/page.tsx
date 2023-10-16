import React from 'react'
import { getTmdbMovieByName } from '../services/tmdbService';

const About = () => {
  getTmdbMovieByName("UnCharitable");

  return (
    <div>
      About
    </div>
  )
}

export default About