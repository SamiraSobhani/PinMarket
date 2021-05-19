import React, { useEffect, useState } from "react";
import IdleTimer from "./IdleTimer";
import { ACCESS_TOKEN } from "../constants";
import Alert from "react-s-alert";
import IdleTimeOutModal from "./IdleTimeOutModal";

export default function Timer(props) {
  const [isTimeout, setIsTimeout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const expiredTime = parseInt(sessionStorage.getItem("_expiredTime"), 10);

  const handleLogout = () => {
    // setShowModal(false);
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(expiredTime);
    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
      Alert.success("Please log back in!");
    }

    // closeModal();
  };

  // const updateExpiredTime = () => {
  //   if (this.timeoutTracker) {
  //     clearTimeout(this.timeoutTracker);
  //   }
  //   this.timeoutTracker = setTimeout(() => {
  //     sessionStorage.setItem("_expiredTime", Date.now() + this.timeout * 100);
  //   }, 300);
  // };

  // if (expiredTime > 0 && 10 < Date.now() - expiredTime) {
  //   const myFunction = () => {
  //     if (confirm("You will be logged out automatically in 1 minute")) {
  //       handleLogout();
  //     } else {
  //       timer.updateExpiredTime();
  //       console.log("inside extend timer");
  //     }
  //   };
  //   console.log(Date.now());
  //   console.log(expiredTime);
  //   console.log(Date.now() - expiredTime);
  //   console.log("inside changeShowModal");
  //   myFunction();
  //   // if (showModal !== true) setShowModal(true);
  //   // alert("You will be logged out automatically in 1 minute");
  // }

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 600, //expire after 10seconds will change it to 600 later
      onTimeout: () => {
        setIsTimeout(true);
      },
      onExpired: () => {
        setIsTimeout(true);
      },
    });

    return () => {
      timer.cleanUp();
    };
  }, []);

  return (
    <>
      <IdleTimeOutModal
        isOpen={showModal}
        showModal={showModal}
        closeModal={closeModal}
        openModal={openModal}
        handleLogout={handleLogout}
        // stayHandle={updateExpiredTime}
      />
      <div>{isTimeout ? handleLogout() : ""}</div>
    </>
  );
}
