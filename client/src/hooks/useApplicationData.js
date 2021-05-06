import { useState, useEffect } from "react";
import axios from "axios";
// import { ACCESS_TOKEN } from "../components/constants";
export default function useApplicationData() {
  const [coord, setCoord] = useState({
    // lat: 49.328739,
    // lng: -123.15345,
  });
  const [ACCESS_TOKEN] = useState(localStorage.accessToken);
  const [zoom, setZoom] = useState(null);
  const [state, setState] = useState({
    categories: [
      {
        id: 1,
        name: "florist",
        icon: "/flower2.svg",
      },
      {
        id: 2,
        name: "Driver",
        icon: "/driver.svg",
      },
      {
        id: 3,
        name: "makeup artist",
        icon: "/makeup.png",
      },
      {
        id: 4,
        name: "DJ",
        icon: "/DJ.png",
      },
      {
        id: 5,
        name: "Photographer",
        icon: "/camera-red.png",
      },
      {
        id: 6,
        name: "Dressmaker",
        icon: "/dressmaker.png",
      },
    ],
    posters: [],
    owner: [],
  });
  const [nearPosters, setnearPosters] = useState(state.posters);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let positionInfo = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoord(positionInfo);
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
        setState((prev) => ({
          ...prev,
          posters: res.data,
        }));
        setnearPosters(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    coord,
    setCoord,
    state,
    setState,
    zoom,
    setZoom,
    nearPosters,
    setnearPosters,
  };
}
