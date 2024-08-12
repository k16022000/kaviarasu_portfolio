import React from 'react';
import Header from 'globals/components/Header';
import aboutMe from '../../assets/images/aboutMe.png';
import styles from '../AboutSection/scss/About.module.scss';
import { Image } from 'semantic-ui-react';
import CommonSlider from 'globals/components/commonSlider/CommonSlider';


function AboutSection() {

  const data = [
    {
      "id": 1,
      "name": "Course 1",
      "image": aboutMe
    },
    {
      "id": 2,
      "name": "Course 2",
      "image": aboutMe
    },
    {
      "id": 3,
      "name": "Course 3",
      "image": aboutMe
    },
    {
      "id": 4,
      "name": "Course 4",
      "image": aboutMe
    },
    {
      "id": 5,
      "name": "Course 5",
      "image": aboutMe
    }
  ]

  return (
    <>
      <Header />
      <div id="aboutSection" className={styles.aboutSection}>
        {/* <Image src={aboutMe} alt="Hero Section" className={styles.heroImage} /> */}
        <div className={styles.aboutContentBox}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>About Me</h2>
            <p className={styles.aboutDescription}>
              Dedicated and motivated Frontend Software Developer with 1 year and 2 months of professional experience creating responsive and visually appealing web applications.
              Adept at translating design concepts into efficient and user-friendly code.
              Seeking to contribute expertise in HTML, CSS, JavaScript, and modern frontend frameworks to a dynamic development team.
            </p>
          </div>
        </div>
      </div>
      <CommonSlider
        data={data}
      />
    </>
  );
}

export default AboutSection;

