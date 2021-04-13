import { useState, useEffect } from "react";
import axios from "axios";
// import Cookies from "universal-cookie";
export default function useApplicationData() {
  const [coord, setCoord] = useState({
    lat: 49.328739,
    lng: -123.15345,
  });

  const [zoom, setZoom] = useState(null);
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

  return {
    coord,
    setCoord,
    state,
    setState,
    // loginStatus,
    // setLoginStatus,
    zoom,
    setZoom,
  };
}
