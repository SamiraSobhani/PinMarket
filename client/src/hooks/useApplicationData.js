import { useState, useEffect } from "react";
import axios from "axios";
// import { ACCESS_TOKEN } from "../components/constants";
export default function useApplicationData() {
  const [coord, setCoord] = useState({
    lat: 49.328739,
    lng: -123.15345,
  });
  const [ACCESS_TOKEN] = useState(localStorage.accessToken);

  const [zoom, setZoom] = useState(null);
  const [state, setState] = useState({
    categories: [
      {
        id: 1,
        name: "Driver",
        icon: "/driver.svg",
      },
      {
        id: 2,
        name: "Dressmaker",
        icon: "/dressmaker.png",
      },
      {
        id: 3,
        name: "Photographer",
        icon: "/camera-red.png",
      },
      {
        id: 4,
        name: "DJ",
        icon: "/DJ.png",
      },
      {
        id: 5,
        name: "makeup artist",
        icon: "/makeup.png",
      },
      {
        id: 6,
        name: "florist",
        icon: "/flower2.svg",
      },
    ],
    posters: [],
    // users: [],
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
      .get("http://localhost:8080/posters/all", {
        headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      .then((res) => {
        console.log(res);
        setState((prev) => ({
          ...prev,
          // users: res.data.users,
          posters: res.data,
          // categories: res.data.categories,
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
    zoom,
    setZoom,
  };
}
