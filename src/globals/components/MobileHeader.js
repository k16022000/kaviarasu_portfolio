import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import Logo from "../../assets/images/Logo.png";
import closeIcon from "../../assets/images/header/closeIcon.webp";
import headerBar from "../../assets/images/header/headerBar.webp";
import styles from "./scss/Header.module.scss";
import { useHistory } from "react-router-dom";
import { Icon, Image, Menu, Sidebar } from "semantic-ui-react";

function MobileHeader(props) {
  const { t, visible, setvisible, activeStatus, handleTab } = props;

  const [dropclicked, setDropClicked] = useState(false);

  const history = useHistory();

  const servicesList = [
    {
      name: "RECLYTICS",
      subname: "End to End Recruitment Services",
      url: "Reclytics",
    },
    {
      name: "SKILLYTICS",
      subname: "Dynamic Skill Development",
      url: "Skillytics",
    },

    {
      name: "SPEEDCHECK",
      subname: "AI-powered Background Verification",
      url: "SpeedCheck",
    },
    {
      name: "TALENTICS",
      subname: "Competency Based Resource Management",
      url: "Talentics",
    },
    {
      name: "SPEEDRANK",
      subname: "AI-Powered Assessments for Precise Hiring",
      url: "SpeedRank",
    },

    {
      name: "HUMANIZE",
      subname: "Innovative Employee Engagement",
      url: "Humanize",
    },
    {
      name: "CRIYA",
      subname: "Transformative Corporate Wellness",
      url: "Criya",
    },
    {
      name: "ONBOARDEASE",
      subname: "Digital Onboarding Services",
      url: "Reclytics",
      section: "Onboarding",
    },

    {
      name: "IN-VIEW",
      subname: "Streamline Interview Scheduling",
      url: "Reclytics",
      section: "inview",
    },
  ];

  const handleServiceNavigation = (techSuite, section) => {
    if (section) {
      history.push(`/techsuite/${techSuite}?section=${section}`);
    } else {
      history.push(`/techsuite/${techSuite}`);
    }
    setDropClicked(false);
    setvisible(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <div className="homeLogo">
          <Image
            src={Logo}
            alt="logo"
            className={styles.logo}
            onClickCapture={() => handleTab("Home")}
          />
        </div>
      </div>
      <div className={styles.header_right}>
        <div className={styles.menuBar}>
          <Image
            className={styles.mob_bar}
            src={visible ? closeIcon : headerBar}
            onClick={() => setvisible((prev) => !prev)}
          />
          <Sidebar
            className={styles.sidebar}
            as={Menu}
            animation="overlay"
            icon="labeled"
            direction="right"
            vertical
            visible={visible}
            width="thin"
          >
            <div
              className={
                activeStatus === "Thoughts"
                  ? styles.underSquare
                  : styles.headerLink
              }
              onClickCapture={() => handleTab("Thoughts")}
              fontas="sub heading"
            >
              Thoughts
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className={
                  activeStatus === "Services"
                    ? styles.underSquare
                    : styles.headerLink
                }
                onClickCapture={() => handleTab("Services")}
                fontas="sub heading"
              >
                {t("services")}
              </div>
              <Icon
                name="angle down"
                className={styles.downIcon}
                onClickCapture={() => setDropClicked(!dropclicked)}
              />
            </div>
            <div>
              {dropclicked && (
                <div className={styles.mobservicesDropdown}>
                  {servicesList.map((service) => (
                    <div
                      key={service.id}
                      className={styles.mobserviceItem}
                      onClick={() =>
                        handleServiceNavigation(service.url, service.section)
                      }
                    >

                      <div className={styles.mobtextContainer}>
                        <p className={styles.mobheadtext} fontas="body">
                          {service.subname}
                        </p>
                        <span className={styles.mobsubtext}>
                          {service.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className={
                activeStatus === "Thive"
                  ? styles.underSquare
                  : styles.headerLink
              }
              onClickCapture={() => handleTab("Thive")}
              fontas="sub heading"
            >
              T-Hive
            </div>
            <div
              className={
                activeStatus === "LITCertification"
                  ? styles.underSquare
                  : styles.headerLink
              }
              onClickCapture={() => handleTab("litCertification")}
              fontas="sub heading"
            >
              LIT Certification
            </div>
            <div
              className={
                activeStatus === "Careers"
                  ? styles.underSquare
                  : styles.headerLink
              }
              onClickCapture={() => handleTab("AboutUs")}
              fontas="sub heading"
            >
              {t("about_us")}
            </div>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}

export default withTranslation("translations")(MobileHeader);
