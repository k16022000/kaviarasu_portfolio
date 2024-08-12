import React from "react";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Icon, Container, Grid, Button } from "semantic-ui-react";
import Logo from "assets/images/Logo.png";
import styles from "./scss/NewFooter.module.scss";
import ContactForDemo from "./Contact/ContactForDemo";

function Footer({ t }) {
  const history = useHistory();
  const isMobile = window.innerWidth <= 768;

  const handleNavigation = (path) => {
    history.push(path);
  };

  const handleServiceNavigation = (techSuite) => {
    history.push(`/techsuite/${techSuite}`);
  };

  const openMap = () => {
    window.open(
      "https://maps.app.goo.gl/tYhqBL5nDMMK19QdA",
      "_blank"
    );
  };

  return (
    <>
      <div className={styles.topfooter}>
        <Grid>
          <Grid.Row columns={isMobile ? 1 : 3}>
            <Grid.Column textAlign="center" className={styles.socialBox}>
              <p className={styles.heading}>Contact Us for Demo</p>
              <ContactForDemo />
            </Grid.Column>
            <Grid.Column textAlign="center" className={styles.socialBox}>
              <p className={styles.heading}>Connect with Us</p>
              <div className={styles.flex_items}>
                <Container className={styles.container}>
                  <span className={styles.icons}>
                    <a
                      href="https://www.facebook.com/profile.php?id=100055033837732&mibextid=ZbWKwL"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="facebook f" size="large" />
                    </a>
                    <a
                      href="https://www.instagram.com/kaviyarasu_official_kds?igsh=MWhncmhwdWI3ZGM4Nw=="
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="instagram" size="large" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kaviarasu-n-856b07243/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="linkedin in" size="large" />
                    </a>
                  </span>
                </Container>
              </div>
            </Grid.Column>
            <Grid.Column textAlign="center" className={styles.socialBox}>
              <p className={styles.heading}>Our Location</p>
              <Button
                className={styles.Connectbtn}
                onClick={openMap}
                content="View in Map"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      <div className={styles.footer}>
        <Grid columns={2} stackable reversed="mobile tablet">
          <Grid.Column width={12}>
            <div className={styles.text}>
              <p>Contact Us</p>
              <div>
                <span>E-Mail</span>
                <a href="mailto:beme17041@gmail.com">
                  beme17041@gmail.com
                </a>
              </div>
              <div>
                <span>Contact Number</span>
                <span>+91 9360896961</span>
              </div>
            </div>
          </Grid.Column>

          <Grid.Column width={4}>
            <Grid columns={2}>
              <Grid.Column className={styles.PageContainer}>
                <div>Services</div>
                <p onClick={() => handleServiceNavigation("Web developement")}>
                  Web development
                </p>
              </Grid.Column>
              <Grid.Column className={styles.PageContainer}>
                <span onClick={() => handleNavigation("/Home")}>Home</span>
                <span onClick={() => handleNavigation("/about")}>About</span>
                <span onClick={() => handleNavigation("/skills")}>Skills</span>
                <span onClick={() => handleNavigation("/blog")}>Blog</span>
                <span onClick={() => handleNavigation("/services")}>Services</span>
                <span onClick={() => handleNavigation("/resume")}>Resume</span>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}

export default withTranslation("translations")(Footer);

