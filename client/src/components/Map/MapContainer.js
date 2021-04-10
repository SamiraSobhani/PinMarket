// #############################START################################
// import React, {
//   useCallback,
//   useState,
//   useRef,
//   useEffect,
//   useContext,
// } from "react";
// import mapStyle from "./mapStyle";
// import { appContext } from "./../appContext";
// import {
//   withGoogleMap,
//   withScriptjs,
//   GoogleMap,
//   Marker,
//   InfoWindow,
// } from "react-google-maps";
// import Locate from "./Locate";

// function Map() {
//   const [selectedPoster, setSelectedPoster] = useState(null);
//   const { coord, setcoord, state } = useContext(appContext);

//   useEffect(() => {
//     const listener = (e) => {
//       if (e.key === "Escape") {
//         setSelectedPoster(null);
//       }
//     };
//     window.addEventListener("keydown", listener);

//     return () => {
//       window.removeEventListener("keydown", listener);
//     };
//   }, []);

//   function selectedIcon(id) {
//     const SC = state.categories.find((category) => category.id === id);
//     return SC.icon;
//   }
//   const options = {
//     styles: mapStyle,
//     disableDefaultUI: true,
//     zoomControl: true,
//   };
//   const mapRef = useRef();
//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   const panTo = useCallback(({ lat, lng }) => {
//     if (mapRef.current) {
//       mapRef.current.panTo({ lat, lng });
//       mapRef.current.setZoom(15);
//     }
//   }, []);
//   useEffect(() => {
//     const lat = coord.lat;
//     const lng = coord.lng;
//     panTo({ lat, lng });
//   }, [coord]);

//   // if (loadError) return "Error loading maps";
//   // if (!isLoaded) return "Loading maps";

//   return (
//     <appContext.Provider value={{ coord, state, setcoord }}>
//       <GoogleMap
//         defaultZoom={14}
//         center={coord}
//         options={options}
//         onLoad={onMapLoad}
//         defaultOptions={{ styles: mapStyle }}
//       >
//         {state.posters.map((poster) => (
//           <Marker
//             key={poster.id}
//             animation={window.google.maps.Animation.DROP}
//             position={{
//               lat: poster.latitude,
//               lng: poster.longitude,
//             }}
//             onClick={() => {
//               setSelectedPoster(poster);
//             }}
//             icon={{
//               url: selectedIcon(poster.category_id),
//               scaledSize: new window.google.maps.Size(42, 42),
//             }}
//           />
//         ))}

//         {selectedPoster && (
//           <InfoWindow
//             onCloseClick={() => {
//               setSelectedPoster(null);
//             }}
//             position={{
//               lat: selectedPoster.latitude,
//               lng: selectedPoster.longitude,
//             }}
//             onClick={() => {
//               setcoord({
//                 lat: selectedPoster.latitude,
//                 lng: selectedPoster.longitude,
//               });
//             }}
//           >
//             <a
//               className="infoWindow__click"
//               href={`http://localhost:3000/posters/search/${selectedPoster.id}`}
//             >
//               <div>
//                 <h2>{selectedPoster.title}</h2>
//                 <p>{selectedPoster.description}</p>
//               </div>
//             </a>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </appContext.Provider>
//   );
// }

// import useApplicationData from "../../hooks/useApplicationData";
// const MapWrapped = withScriptjs(withGoogleMap(Map));
// export default function App() {
//   const something = (function () {
//     let executed = false;
//     return function () {
//       if (!executed) {
//         executed = true;
//         window.location.reload();
//       }
//     };
//   })();
// #################################END###########################################3
  // const something = function () {
  //   const { coord, setCoord } = useApplicationData();
  //   return function () {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(function (position) {
  //         let positionInfo = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };

  //         console.log(positionInfo);
  //         setCoord(positionInfo);
  //         console.log(coord);
  //       });
  //     }
  //   };
  // };
// ###############################START#######################################
//   return (
//     <div className="myMap">
//       <Locate panTo={panTo} />
//       <MapWrapped
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBRUYC8MMdlwDjIzBVvo7U5oHa3h2tQ09k&libraries=places`}
//         loadingElement={<div style={{ height: `95%` }} />}
//         containerElement={<div style={{ height: `100%` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     </div>
//   );
// }
// #############################END########################################
// import React from "react";

// class Map extends React.Component {
//   state = {
//     latitude: null,
//     longitude: null,
//     userAddress: null,
//   };

//   getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.getLocation.getCurrentLocation(
//         this.getCoordinates,
//         // this.handleLocationError
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   getCoordinates(position) {
//     console.log(position);
//     this.setState({
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude,
//     });
//     console.log(this.state.latitude);
//   }
//   handleLocationError = (error) => {
//     switch (error.code) {
//       case error.PERMISSION_DENIED:
//         alert = "User denied the request for Geolocation.";
//         break;
//       case error.POSITION_UNAVAILABLE:
//         alert = "Location information is unavailable.";
//         break;
//       case error.TIMEOUT:
//         alert = "The request to get user location timed out.";
//         break;
//       case error.UNKNOWN_ERROR:
//         alert = "An unknown error occurred.";
//         break;
//     }
//   };
//   render() {
//     console.log(this.state.longitude);
//     return (
//       <div>
//         <button onClick={this.getLocation}>get location</button>
//         <p>lat:{this.state.latitude}</p>
//         {this.state.latitude && this.state.longitude ? (
//           <img
//             src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=12&size=400*300&sensor=false&marker=color:red%7c${this.state.latitude},${this.state.longitude}?key=AIzaSyBRUYC8MMdlwDjIzBVvo7U5oHa3h2tQ09k`}
//             alt=""
//           ></img>
//         ) : null}
//       </div>
//     );
//   }
// }
// export default Map;