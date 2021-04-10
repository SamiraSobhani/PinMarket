import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [coord, setCoord] = useState({ lat: 49.2835, lng: -123.1184 });
  const [loginStatus, setLoginStatus] = useState("");
  const [state, setState] = useState({
    categories: [],
    posters: [],
    users: [],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let positionInfo = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoord(positionInfo);
        console.log(coord);
      });
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/posters")
      .then((res) => {
        setState((prev) => ({
          ...prev,
          users: res.data.users,
          posters: res.data.posters,
          categories: res.data.categories,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      console.log({ response });
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
        console.log(loginStatus);
        // setLoginStatus((prev) => ({
        //   ...prev,
        //   loginStatus: response.data.user[0].username
        // }));
      }
    });
  });

  // function showPosition() {}

  // const options = {
  //   enableHighAccuracy: true,
  //   timeout: 5000,
  //   maximumAge: 0,
  // };

  // function success(pos) {
  //   let crd = pos.coords;

  //   console.log("Your current position is:");
  //   console.log(`Latitude : ${crd.latitude}`);
  //   console.log(`Longitude: ${crd.longitude}`);
  //   console.log(`More or less ${crd.accuracy} meters.`);
  // }

  // function error(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }

  // navigator.geolocation.getCurrentPosition(success, error, options);

  return { coord, setCoord, state, setState, loginStatus, setLoginStatus };
}
