import { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";

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
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
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
        style={{ width: 450, margin: 8 }}
        disabled={!ready}
        label="Location"
      />
      {status === "OK" && renderSuggestions()}
    </div>
  );
}
