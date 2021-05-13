import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [coord, setCoord] = useState({});
  const [ACCESS_TOKEN] = useState(localStorage.accessToken);
  const [zoom, setZoom] = useState(null);
  const [state, setState] = useState({
    categories: [],
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
      .get("http://localhost:8080/categories", {
        headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      .then((res) => {
        setState((prev) => ({
          ...prev,
          categories: [...res.data],
        }));
      })
      .catch((err) => console.log(err));
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
