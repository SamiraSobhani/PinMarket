import React from "react";

function SearchPoster() {
    const p1=[49.2834, -123.1157]
  // HAVERSINE FORMULA USED FOR GREAT CIRCLE DISTANCE BETWEEN TWO POINTS, AKA 'AS-THE-CROW-FLIES'
  const distBtw2Ptss = (p1, p2) => {
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
      return distance;
    } catch (error) {
      return null;
    }
  };
  return <div></div>;
}

export default SearchPoster;
