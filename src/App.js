import React, { Suspense, useCallback, useMemo, useRef } from "react";
import { withTranslation } from "react-i18next";
import { Switch, Route, useLocation } from "react-router-dom";
import { lazy } from "react";
import styles from "./App.module.scss";
import useConstructor from "globals/utils/useConstructor";
import { updateUserInfo } from "globals/utils/index";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-input-2/lib/style.css";
import DefaultLoader from "globals/components/loader/DefaultLoader";
import useSaveScrollPosition from "globals/utils/useSaveScrollPosition";
import './assets/scss/common.scss';
import NewFooter from "globals/components/NewFooter";

const HomeScreen = lazy(() => import("./screens/home/HomeScreen"));
const About = lazy(() => import("./screens/AboutSection/About"));
const Skills = lazy(() => import("./screens/Skills/Skills"));
const WebcamComponent = lazy(() => import("./screens/WebcamComponent"));

function App() {
  useConstructor(() => {
    updateUserInfo();
  });

  console.log('resolution-->', window.innerWidth, window.innerHeight);

  const location = useLocation();
  const ref = useRef();
  const excludedPaths = useMemo(() => ["/login", "/adminPage"], []);

  const checkHeaderFooterRequired = useCallback(
    (path) => {
      let mobileExcludedPaths
      if (window.innerWidth <= 560) {
        mobileExcludedPaths = [...excludedPaths, "/techsuite/Reclytics/jobDetails"];
        return !mobileExcludedPaths.some((excludedPath) =>
          path.startsWith(excludedPath)
        );
      }
      return !excludedPaths.some((excludedPath) =>
        path.startsWith(excludedPath)
      );
    },
    [excludedPaths]
  );

  const isHeaderFooterRequired = checkHeaderFooterRequired(location.pathname);

  useSaveScrollPosition();

  return (
    <Suspense fallback={<DefaultLoader />}>
      <div className={styles.App}>
        <div
          className={!isHeaderFooterRequired ? styles.right : styles.left}
          ref={ref}
        >
          <Switch>
            <Route path="/webcam" component={WebcamComponent} />
            <Route path="/about" component={About} />
            <Route path="/skills" component={Skills} />
            <Route path="/" component={HomeScreen} />
          </Switch>
          {isHeaderFooterRequired && <NewFooter />}
        </div>
      </div>
    </Suspense>
  );
}

export default withTranslation("translations")(App);
