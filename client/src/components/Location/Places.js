import { useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { appContext } from "./../appContext";

export default function Places() {
  const { setCoord } = useContext(appContext);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here if we want to */
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setCoord({ lat, lng });
      })
      .catch((error) => {
        console.log("Error getting geocode: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Grid
          className="suggestion"
          container
          alignItems="center"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <Grid item xs>
            <Typography>
              <LocationOnIcon /> {main_text} {secondary_text}
            </Typography>
          </Grid>
        </Grid>
      );
    });

  return (
    <div ref={ref}>
      <TextField
        value={value}
        onChange={handleInput}
        style={{
         
          margin: 8,
        }}
        disabled={!ready}
        label="Location"
      />
      {status === "OK" && renderSuggestions()}
    </div>
  );
}
// import React from "react";

// class Places extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = this.initialState();
//     this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.autocomplete = null;
//   }

//   componentDidMount() {
//     const google = window.google;
//     this.autocomplete = new google.maps.places.Autocomplete(
//       document.getElementById("autocomplete"),
//       {}
//     );

//     this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
//   }

//   initialState() {
//     return {
//       name: "",
//       street_address: "",
//       city: "",
//       // state: '',
//       zip_code: "",
//       googleMapLink: "",
//     };
//   }
//   handleSelect = ({ description }) => () => {
//     setValue(description, false);
//     clearSuggestions();
//     getGeocode({ address: description })
//       .then((results) => getLatLng(results[0]))
//       .then(({ lat, lng }) => {
//         setCoord({ lat, lng });
//       })
//       .catch((error) => {
//         console.log("Error getting geocode: ", error);
//       });
//   };
//   handleChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.dispatch(addParlor(this.state));
//     this.clearForm();
//   }

//   handlePlaceSelect() {
//     let addressObject = this.autocomplete.getPlace();
//     let address = addressObject.address_components;
//     this.setState({
//       name: addressObject.name,
//       street_address: `${address[0].long_name} ${address[1].long_name}`,
//       city: address[4].long_name,
//       // state: address[6].short_name,
//       zip_code: address[7].short_name,
//       googleMapLink: addressObject.url,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             id="autocomplete"
//             className="input-field"
//             ref="input"
//             type="text"
//           />
//           {/* <input
//               name={"name"}
//               value={this.state.name}
//               placeholder={"Name"}
//               onChange={this.handleChange}
//             /> */}
//           <input
//             name={"street_address"}
//             value={this.state.street_address}
//             placeholder={"Street Address"}
//             onChange={this.handleChange}
//           />
//           <input
//             name={"city"}
//             value={this.state.city}
//             placeholder={"City"}
//             onChange={this.handleChange}
//           />
//           {/* <input
//               name={"state"}
//               value={this.state.state}
//               placeholder={"State"}
//               onChange={this.handleChange}
//             /> */}
//           <input
//             name={"zip_code"}
//             value={this.state.zip_code}
//             placeholder={"Zipcode"}
//             onChange={this.handleChange}
//           />
//         </form>
//       </div>
//     );
//   }
// }

// export default Places;
