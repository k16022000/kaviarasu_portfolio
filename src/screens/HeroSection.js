import React from 'react';
import kavi from '../assets/images/Shake-featured-keep-devs-happy.webp';
import styles from './scss/HeroSection.module.scss';
import { Image } from 'semantic-ui-react';

function HeroSection() {
  return (
    <section id="heroSection" className={styles.heroSection}>
      <div className={styles.heroSectionContentBox}>
        <div className={styles.heroSectionContent}>
          <p className={styles.sectionTitle}>{`Hey, I'm Kavi`}</p>
          <h1 className={styles.heroSectionTitle}>
            <span className={styles.heroSectionTitleColor}>Software</span>{" "}
            <br />
            Developer
          </h1>
          <p className={styles.heroSectionDescription}>
            I specialize in building responsive and user-friendly web applications.
            <br /> With expertise in modern technologies, I transform ideas into interactive digital experiences.
          </p>

        </div>
        <button className={styles.btnBtnPrimary}>Get In Touch</button>
      </div>
      <div className={styles.heroSectionImg}>
        <Image src={kavi} alt="Hero Section" className={styles.heroImage} />
      </div>
    </section>
  )
}

export default HeroSection