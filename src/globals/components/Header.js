import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import kaviarasuResume from '../../screens/Resume/kaviarasu.pdf';

const Headers = (props) => {
  const currentPath = window.location.pathname.substring(1);
  const [visible, setvisible] = useState(false);
  const [activeStatus, setactiveStatus] = useState(currentPath || "");
  const history = useHistory();
  const isMobile = window.innerWidth <= 768;

  const headerMenuItems = [
    { url: 'home', text: 'Home' },
    { url: 'about', text: 'About' },
    { url: 'skills', text: 'Skills' },
    // { url: 'blog', text: 'Blog' },
    // { url: 'services', text: 'Services' },
    { url: 'resume', text: 'Resume' },
  ];

  const handleTab = (tabname) => {
    if (tabname === 'resume') {
      window.open(kaviarasuResume, '_blank');
    }
    history.push(`/${tabname}`);
    // setactiveStatus(tabname);
    // setvisible(false);
    // window.localStorage.setItem('activeTab', '');
    // window.localStorage.removeItem("selectedService");
    // if (tabname === 'Home') window.localStorage.clear();
  };

  return (
    <>
      {!isMobile ? (
        <DesktopHeader
          activeStatus={activeStatus}
          handleTab={handleTab}
          headerMenuItems={headerMenuItems}
        />
      ) : (
        <MobileHeader
          visible={visible}
          setvisible={setvisible}
          activeStatus={activeStatus}
          handleTab={handleTab}
        />
      )}
    </>
  );
};

export default withTranslation("translations")(Headers);
