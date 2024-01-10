import React from 'react'
import styles from '../page.module.css'
import CentralImage from '../components/CentralImage'

const About = () => {
  return (
    <div className={styles.main}>
      <CentralImage />
      <div className="mockup-code">
        <pre data-prefix="~" className="text-info"><code>About this project :</code></pre>
        <pre data-prefix="~"><code>To resume the loading text, movie trends is a web application from a scrapping project</code></pre>
        <pre data-prefix="~"><code>showcasing the real trend of US cinema releases of the week, scrapping different websites dedicated to cinema.</code></pre>
        <pre data-prefix="~"><code>It's also using the TMDB free API for specific data and also to recover images.</code></pre>
        <pre data-prefix="~"  className="text-warning"><code>This is an academic project, it has no commercial vocation.</code></pre>
      </div>
    </div>
  )
}

export default About