import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import Slider from "react-slick";
import { Button, Card, Icon, Image, Input } from "semantic-ui-react";
import styles from "./commonSlider.module.scss";
// import ShowTrackCourseModal from "screens/services/ShowTrackCourseModal";
import useScrollToTopOnMount from "globals/utils/useScrollToTopOnMount";

const CommonSlider = (props) => {
  const {
    t, data, setState,
    // activeSlide,
    // setActiveSlide,
    slickRef,
    name,
    isModal,
  } = props;

  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeSlide, setActiveSlide] = useState(0);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedData = data?.slice().sort((a, b) => {
    const sortOrderFactor = sortOrder === "asc" ? 1 : -1;
    return sortOrderFactor * a.name.localeCompare(b.name);
  });

  const filteredData = sortedData?.filter((element) =>
    element.name.toLowerCase().includes(searchItem.toLowerCase())
  );
  const totalSlides = filteredData?.length;

  const slides = window.innerWidth > 560 ? 4 : 2;
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      (activeSlide > 0) && (
        <div className={name === "Role Based Assessments" ? `${styles.prevArrow}` : `${styles.customPrevArrow}`} onClick={onClick}>
          <Icon name="angle left" size="big" />
        </div>
      )
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      (activeSlide < totalSlides - slides) && (
        <div className={name === "Role Based Assessments" ? `${styles.nextArrow}` : `${styles.customNextArrow}`} onClick={onClick}>
          <Icon name="angle right" size="big" />
        </div>
      )
    );
  };

  // useEffect(() => {
  //   setActiveSlide(0);
  // }, [data])

  const handlePaginationChange = (e, { activePage }) => {
    const newIndex = (activePage - 1) * slides;
    setActiveSlide(newIndex);
    slickRef.current.slickGoTo(newIndex);
  };

  const settings = {
    // dots: window.innerWidth > 560 ? false : true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: slides,
    cssEase: "linear",
    arrows: true,
    // customPaging: (i) => <div className={styles.customDot}>{i + 1}</div>,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  useScrollToTopOnMount();

  return (
    <div className={styles.showTrackCategory}>
      <div>
        <h1>{name}</h1>
        <div>
          {/* <div onClick={toggleSortOrder}>
            <Icon
              size="large"
              name={`sort content ${sortOrder === "asc" ? "ascending" : "descending"}`}
            />
            <p>{t("sort_by")}</p>
          </div> */}
          <Input
            type="text"
            icon='search'
            placeholder="Search..."
            focus
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.visibleCards}>
        <Slider {...settings} ref={slickRef}>
          {filteredData?.map((element, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className={styles.courseSlider}
                >
                  <Card
                    style={{ height: "100%", borderRadius: "0" }}
                    onClick={() => console.log('coursetrue')}
                  >
                    <div />
                    <Image
                      style={{ width: "100%", height: window.innerWidth > 560 ? "300px" : "200px" }}
                      src={element.image}
                    />
                    <Card.Content>
                      <Card.Header
                        style={{
                          height: window.innerWidth > 560 ? "50px" : "35px",
                          fontSize: window.innerWidth < 560 && "2em",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {element.name}
                      </Card.Header>
                    </Card.Content>
                  </Card>
                </div>
              </React.Fragment>
            );
          })}
        </Slider>
      </div>
      {
        window.innerWidth > 560 ? (
          <div className={styles.viewAll}>
            <Button>
              {`${(activeSlide + 1)} - ${(activeSlide) + 4}`}<span> of {totalSlides}</span>
            </Button>
          </div>
        ) : (
          <div className={styles.viewAllBtnMobileView}>
            <Button>
              {`${(activeSlide + 1)} - ${(activeSlide) + 2}`}<span> of {totalSlides}</span>
            </Button>
          </div>
        )
      }
    </div>
  )
}
export default withTranslation("translations")(CommonSlider);