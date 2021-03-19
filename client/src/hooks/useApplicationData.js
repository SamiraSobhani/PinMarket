import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {
  const [coord, setCoord] = useState({ lat: 49.2865, lng: -123.1263 });
  const [state, setState] = useState({
    categories: {},
    posters: {},
    users: {},
  });

  // GET ALL INFO REQUIRED FOR PAGE FROM DB AND ADD TO STATE
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

  return { coord, setCoord, state, setState };
}
