// import axios from "axios";

// class SearchPoster extends Component {
//   state = {
//     value: 2,
//     response: {
//       posters: [],
//       categories: [],
//       users: [],
//     },
//     myResult: [],
//   };

//   componentDidUpdate() {
//     if (this.state.value !== 2) {
//     }
//   }

//   getData() {
//     axios
//       .get("http://localhost:8080/posters")
//       .then((res) => {
//         this.setState({ response: res.data });
//       })
//       .catch((error) => console.log(error));
//   }
//   componentDidMount() {
//     this.getData();
//     this.distBtw2Ptss();
//   }

//   // HAVERSINE FORMULA USED FOR GREAT CIRCLE DISTANCE BETWEEN TWO POINTS, AKA 'AS-THE-CROW-FLIES'
//   distBtw2Ptss = (p1, p2, p2id) => {
//     const myArray = [];
//     this.state.response.posters.map((poster) => {
//       const p1 = [49.328739, -123.15345];
//       const p2 = [poster.latitude, poster.longitude];
//       const p2id = poster.id;
//       try {
//         const lat1 = p1[0] / (180 / Math.PI);
//         const lat2 = p2[0] / (180 / Math.PI);
//         const lng1 = p1[1] / (180 / Math.PI);
//         const lng2 = p2[1] / (180 / Math.PI);
//         const distance =
//           6371 *
//           Math.acos(
//             Math.sin(lat1) * Math.sin(lat2) +
//               Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2)
//           );
//         myArray.push({ distance, p2id, p2 });
//       } catch (error) {
//         return null;
//       }
//     });
//     return this.filterDistance(myArray);
//   };

//   filterDistance = (myRes) => {
//     const disArray = [];
//     myRes.map((distanceObj) => {
//       if (distanceObj.distance < this.state.value) {
//         console.log(distanceObj);
//         disArray.push(distanceObj);
//         console.log(disArray);
//         return disArray;
//       }
//     });
//   };

//   render() {
//     this.distBtw2Ptss();

//     return (
//       <div className="slider">
//         <InputRange
//           formatLabel={(value) => `${value}KM`}
//           maxValue={40}
//           minValue={0}
//           value={this.state.value}
//           onChange={(value) => {
//             this.setState({ value });
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default SearchPoster;

import { useContext, useEffect, useState } from "react";
import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { appContext } from "./../appContext";
import MyButtons from "../ThreeButton/MyButtons";
import SearchMap from "./SearchMap";
// import { Slider } from "material-ui-slider";
function SearchPoster() {
  const { coord, setCoord, state, setState } = useContext(appContext);
  const [value, setValue] = useState(0);
  const [nearPosters, setnearPosters] = useState([]);
  console.log(state.posters);

  const distBtw2Ptss = (p1, p2, p2id) => {
    const myArray = [];
    state.posters.map((poster) => {
      const p1 = [49.328739, -123.15345];
      const p2 = [poster.lat, poster.lng];
      const p2id = poster.id;
      try {
        const lat1 = p1[0] / (180 / Math.PI);
        const lat2 = p2[0] / (180 / Math.PI);
        const lng1 = p1[1] / (180 / Math.PI);
        const lng2 = p2[1] / (180 / Math.PI);
        const distance =
          6371 *
          Math.acos(
            Math.sin(lat1) * Math.sin(lat2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2)
          );
        console.log(distance);
        myArray.push({ distance, p2id, p2 });
        console.log(myArray);
      } catch (error) {
        return null;
      }
    });
    return filterDistance(myArray);
  };

  const filterDistance = (myRes) => {
    const disArray = [];
    myRes.map((distanceObj) => {
      if (distanceObj.distance < value) {
        console.log(distanceObj);
        disArray.push(distanceObj.p2id);
        console.log(disArray);
        return posterAroundMe(disArray);
      }
    });
  };
  const posterAroundMe = (disArray) => {
    const myResult = [];
    disArray.map((posterId) => {
      state.posters.map((poster) => {
        if (poster.id === posterId) {
          myResult.push(poster);
        }
      });
      console.log({ myResult });
      setnearPosters(myResult);
      return;
    });
  };
  // useEffect(() => {
  //   distBtw2Ptss();
  // }, []);
  // distBtw2Ptss();
  return (
    <div>
      <SearchMap nearPosters={nearPosters} />
      <MyButtons />
      <div className="slider">
        {/* <Typography id="non-linear-slider" gutterBottom>
          Temperature range
        </Typography> */}
        {/* <Slider
          value={value}
          min={0}
          step={0.1}
          max={40}
          getAriaValueText={(value) => `${value}KM`}
          valueLabelFormat={(value) => `${value}KM`}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
          onChangeComplete={(value) => {
            setValue(parseInt(value));
            distBtw2Ptss();
            setState((prevState) => ({
              ...prevState,
              posters: nearPosters,
            }));
          }}
        /> */}
        <InputRange
          formatLabel={(value) => `${value}KM`}
          maxValue={40}
          minValue={0}
          value={value}
          onChange={(value) => {
            setValue(parseInt(value));
            distBtw2Ptss();
            setState((prevState) => ({
              ...prevState,
              posters: [...prevState.posters, nearPosters],
            }));
          }}
        />
      </div>
    </div>
  );
}

export default SearchPoster;
