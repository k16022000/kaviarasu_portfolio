import React from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';
import django from '../../assets/images/django.svg';
import css from '../../assets/images/css.svg';
import git from '../../assets/images/git.svg';
import html from '../../assets/images/html.svg';
import javascript from '../../assets/images/javascript.svg';
import less from '../../assets/images/less.svg';
import mongodb from '../../assets/images/mongodb.svg';
import nodejs from '../../assets/images/nodejs.svg';
import reactjs from '../../assets/images/reactjs.svg';
import scss from '../../assets/images/scss.svg';
import thinkcreative from '../../assets/images/thinkcreative.svg';
import communication from '../../assets/images/communication.svg';
import teamwork from '../../assets/images/teamwork.svg';
import Header from 'globals/components/Header';
import styles from '../scss/Skills.module.scss';

const skillsData = [
  {
    category: "Technical Skills",
    skills: [
      { name: "React", image: reactjs },
      { name: "JavaScript", image: javascript },
      { name: "HTML", image: html },
      { name: "CSS", image: css },
      { name: "Less", image: less },
      { name: "Scss", image: scss },
      { name: "GIT", image: git },
      { name: "Nodejs", image: nodejs },
      { name: "Django", image: django },
      { name: "Mongodb", image: mongodb },
    ]
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Problem Solving", image: thinkcreative },
      { name: "Communication", image: communication },
      { name: "Teamwork", image: teamwork }
    ]
  }
];

const SkillsGrid = () => {
  const isMobileView = window.innerWidth <= 560;

  return (
    <>
      <Header />
      <div className={styles.skillsSection}>
        {skillsData.map((category, index) => (
          <div key={index}>
            <h3 className={styles.skillsCategory}>{category.category}</h3>
            <Grid columns={isMobileView ? 2 : 4} className={styles.gridContainer}>
              {category.skills.map((skill, i) => (
                <Grid.Column key={i}>
                  <Card className={styles.CuttingEdgeCard}>
                    <Card.Content>
                      <Image src={skill.image} alt={skill.name} size="tiny" />
                      <Card.Header fontas="sub heading">{skill.name}</Card.Header>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillsGrid;
