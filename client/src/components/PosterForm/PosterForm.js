/*global google*/

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

import { useState, useContext } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Places from "../Location/Places";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import { appContext } from "./../appContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [payType, setPayType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");
  const { coord, setCoord, state, setState } = useContext(appContext);
  const { format } = require("date-fns");
  const [toUserPage, setToUserPage] = useState(false);

  const handleFormSubmit = (newPoster) => {
    const ACCESS_TOKEN = sessionStorage.accessToken;

    axios
      .post("http://localhost:8080/poster", newPoster, {
        headers: {
          authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      })

      .then(() => {
        window.location.replace("/posters");
        setToUserPage(true);
      })
      .catch((err) => console.log(err));
  };
  function validate(event) {
    event.preventDefault();
    const newPoster = {
      title: title,
      description: description,
      price: price,
      payType: payType,
      startDate: startDate,
      endDate: endDate,
      lat: coord.lat,
      lng: coord.lng,
      isActive: true,
      category: category_id,
    };

    if (
      title === "" ||
      description === "" ||
      price === "" ||
      payType === "" ||
      startDate === "" ||
      endDate === ""
    ) {
      setError("Please fill all fields");
      return;
    }
    setError("");

    handleFormSubmit(newPoster);
  }

  const handleChange = (event) => {
    setPayType(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const findCategory = (category_id) => {
    return state.categories.find((category) => category.id == category_id);
  };

  return (
    <div className="post-form">
      <h3 className="post-form__header">Create a New Poster</h3>
      <div className="post-form__content">
        <div className="post-form-container">
          <TextField
            id="job-title"
            style={{ width: 450, margin: 8, marginTop: 0 }}
            label="title"
            placeholder="What do you need help with?"
            fullWidth
            onChange={(event) => setTitle(event.target.value)}
            autoComplete="off"
          />
          <br />
          <TextField
            id="job-descripton"
            name="job-descripton"
            style={{ width: 450, margin: 8 }}
            label="Description"
            placeholder="Details of your job"
            fullWidth
            multiline
            rowsMax="10"
            onChange={(event) => setDescription(event.target.value)}
          />
          <Autocomplete
            onChange={(event, value) =>
              setCategory(value ? findCategory(value.id) : "")
            }
            id="category-search"
            name="category-search"
            value={state.categories.id}
            options={Object.values(state.categories)}
            getOptionLabel={(option) => option.name}
            style={{ width: 450, margin: 8 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <Places setCoord={setCoord} coord={coord} />
          <TextField
            label="Price"
            id="price"
            name="price"
            value={state.price}
            style={{ width: 208, margin: 8, marginRight: 25 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={(event) => setPrice(Number(event.target.value))}
            autoComplete="off"
          />
          <FormControl onSubmit={(event) => event.preventDefault()}>
            <InputLabel id="pay-type">Pay Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="pay-type-select"
              name="pay-type-select"
              value={state.payType}
              onChange={handleChange}
              style={{ width: 208 }}
            >
              <MenuItem value={"hourly"}>Hourly</MenuItem>
              <MenuItem value={"fix"}>Fix</MenuItem>
            </Select>
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <KeyboardDatePicker
                style={{ width: 208, margin: 8, marginRight: 25 }}
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <br />
              <KeyboardDatePicker
                style={{ width: 208, margin: 8 }}
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <br />
          <span>{error}</span>

          <button
            onClick={(event) => validate(event)}
            className="post-form__button"
          >
            POST
          </button>
        </div>
      </div>
    </div>
  );
}
