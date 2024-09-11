import React from "react";
import phone from "assets/images/common-icons/phone-icon.svg";
import whatsapp from "assets/images/common-icons/whatsapp-icon.svg";
import mail from "assets/images/common-icons/mail-icon.svg";
import styles from "./ContactForDemo.module.scss";

function ContactForDemo() {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+919360896961';
  };

  const handleWhatsappClick = () => {
    window.open("https://wa.me/9360896961");
  };

  const handleMailClick = () => {
    const email = "beme17041@gmail.com";
    const subject = "Demo Request";
    const body = ``;

    const queryParams = {
      su: subject,
      body: body,
    };

    const queryParamsString = Object.keys(queryParams)
      .map((key) => key + "=" + encodeURIComponent(queryParams[key]))
      .join("&");

    const isMobileView = window.innerWidth < 480;
    let mailLink = "";

    if (isMobileView) {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        if (
          confirm(
            "Would you like to open your default mail app to send an email?"
          )
        ) {
          window.location.href = `mailto:${email}?subject=${
            encodeURIComponent(subject) || ""
          }&body=${encodeURIComponent(body) || ""}`;
        }
      } else {
        mailLink = `mailto:${email}?subject=${
          encodeURIComponent(subject) || ""
        }&body=${encodeURIComponent(body) || ""}`;
        window.open(mailLink, "_blank");
      }
    } else {
      mailLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}&${queryParamsString}`;

      const mailtoLink = `mailto:${email}?subject=${
        encodeURIComponent(subject) || ""
      }&body=${encodeURIComponent(body) || ""}`;
      window.open(mailLink || mailtoLink, "_blank");
    }
  };

  return (
    <div className={styles.ContactForDemo}>
      <div onClickCapture={handlePhoneClick}>
        <img src={phone} alt="phone" />
      </div>
      <div onClickCapture={handleWhatsappClick}>
        <img src={whatsapp} alt="whatsapp" />
      </div>
      <div onClickCapture={handleMailClick}>
        <img src={mail} alt="mail" />
      </div>
    </div>
  );
}

export default ContactForDemo;


