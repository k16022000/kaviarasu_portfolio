import React, { useState, useMemo } from "react";
import { withTranslation } from "react-i18next";
import Logo from "../../assets/images/Logo.png";
import { Button, Grid, Header, Icon, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import styles from "./scss/Header.module.scss";

function DesktopHeader(props) {
  const { t, activeStatus, handleTab, headerMenuItems } = props;
  const [hovered, setHovered] = useState(false);

  const history = useHistory();

  // const handleServiceNavigation = (techSuite, section) => {
  //   setHovered(false);
  //   if (section) {
  //     history.push(`/techsuite/${techSuite}?section=${section}`);
  //   } else {
  //     history.push(`/techsuite/${techSuite}`);
  //   }
  // };

  const KaviTextSVG = useMemo(() => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="60px"
      width="auto"
      viewBox="0 0 200 100"
      style={{ cursor: 'pointer' }}
      onClickCapture={() => history.push(`/home`)}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="40"
        fontWeight={700}
        fill="#705391"
        fontFamily="Lato"
      >
        Kavi.
      </text>
    </svg>
  ), [history]);

  return (
    <div className={styles.DesktopHeader}>
      <div>
        {KaviTextSVG}
        <div className={styles.menuItems}>
          {headerMenuItems.map((menuItem) => (
            <div
              key={menuItem.url}
              className={styles.menuItem}
            // onClickCapture={() => handleTab(menuItem.url)}
            >
              <span
                className={
                  activeStatus === menuItem.url
                    ? styles.activeLink
                    : styles.headerLink
                }
                onClickCapture={() => handleTab(menuItem.url)}
                onMouseEnter={() =>
                  menuItem.text === "services" && setHovered(true)
                }
                onMouseLeave={() =>
                  menuItem.text === "services" && setHovered(false)
                }
                fontas="body"
              >
                {t(menuItem.text)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        className={styles.loginbtn}
        onClick={() => window.open("https://wa.me/9360896961")}
      >
        {t("contact_me")}
      </button>
    </div>
  );
}

export default withTranslation("translations")(DesktopHeader);
