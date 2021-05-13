import React, { useEffect, useState } from "react";
import IdleTimer from "./IdleTimer";
import { ACCESS_TOKEN } from "./constants";

import Alert from "react-s-alert";
export default function Timer(props) {
  const [isTimeout, setIsTimeout] = useState(false);
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 100, //expire after 10seconds will change it to 600 later
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

  const handleLogout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    console.log(window.location);
    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
      Alert.success("Please log back in!");
    }
  };

  return (
    <div>
      {isTimeout
        ? (window.sessionStorage.removeItem(ACCESS_TOKEN), handleLogout())
        : ""}
    </div>
  );
}
