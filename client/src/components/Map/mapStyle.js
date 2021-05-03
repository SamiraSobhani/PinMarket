// export default [
//   {
//     featureType: "all",
//     elementType: "all",
//     stylers: [
//       {
//         hue: "#e7ecf0",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.province",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         visibility: "off",
//       },
//       {
//         color: "#c91818",
//       },
//       {
//         saturation: "-100",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.province",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         visibility: "on",
//       },
//       {
//         color: "#3b3b3b",
//       },
//       {
//         weight: "2.00",
//       },
//       {
//         lightness: "47",
//       },
//       {
//         invert_lightness: true,
//       },
//     ],
//   },
//   {
//     featureType: "administrative.province",
//     elementType: "labels.text",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.locality",
//     elementType: "labels.text",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "administrative.neighborhood",
//     elementType: "labels.text",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.man_made",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#8f8c8b",
//       },
//       {
//         lightness: "74",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.man_made",
//     elementType: "labels.text",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.natural",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         hue: "#0007ff",
//       },
//       {
//         saturation: "-66",
//       },
//       {
//         lightness: "24",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.natural.landcover",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         hue: "#00ffed",
//       },
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.natural.terrain",
//     elementType: "geometry",
//     stylers: [
//       {
//         visibility: "off",
//       },
//       {
//         hue: "#ff0000",
//       },
//     ],
//   },
//   {
//     featureType: "landscape.natural.terrain",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         visibility: "on",
//       },
//       {
//         hue: "#6800ff",
//       },
//     ],
//   },
//   {
//     featureType: "poi",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "all",
//     stylers: [
//       {
//         saturation: -70,
//       },
//     ],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         hue: "#0007ff",
//       },
//     ],
//   },
//   {
//     featureType: "transit",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "all",
//     stylers: [
//       {
//         visibility: "simplified",
//       },
//       {
//         saturation: -60,
//       },
//     ],
//   },
// ];
export default [
  {
    featureType: "administrative.province",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#485466",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#485466",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#498aa7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b4bdd6",
      },
      {
        visibility: "on",
      },
      {
        saturation: "11",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#b4bdd6",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ff0000",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station.bus",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        gamma: "0.82",
      },
      {
        weight: "1.00",
      },
      {
        saturation: "-20",
      },
      {
        lightness: "-20",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#485466",
      },
      {
        saturation: "0",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        weight: "1.41",
      },
    ],
  },
];
