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

export default function Post() {
  // const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [pay_type, setPayType] = useState("");
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const [error, setError] = useState("");
  const { coord, setCoord, state, setState } = useContext(appContext);

  const [toUserPage, setToUserPage] = useState(false);

  function validate(event) {
    event.preventDefault();
    const newPoster = {
      title,
      category_id,
      description,
      price,
      pay_type,
      start_date,
      end_date,
      lat: coord.lat,
      lng: coord.lng,
      client_id: 1,
      helper_id: 4,
    };

    if (
      title === "" ||
      category_id === "" ||
      description === "" ||
      price === "" ||
      pay_type === "" ||
      start_date === "" ||
      end_date === ""
    ) {
      setError("Please fill all fields");
      return;
    }
    setError("");

    handleFormSubmit(newPoster);
  }

  const handleFormSubmit = (newPoster) => {
    console.log(newPoster);
    axios
      .post(`http://localhost:8080/posters`, {
        newPoster,
      })
      .then(() => {
        window.location.reload(false);
        setToUserPage(true);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setPayType(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className="post-form">
      <h3 className="post-form__header">Post a New Poster</h3>
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
            onChange={(event, value) => setCategory(value ? value.id : "")}
            id="category-search"
            name="category-search"
            value={state.categories.category_id}
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
            onChange={(event) => setPrice(event.target.value)}
            autoComplete="off"
          />
          <FormControl onSubmit={(event) => event.preventDefault()}>
            <InputLabel id="pay-type">Pay Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="pay-type-select"
              name="pay-type-select"
              value={state.pay_type}
              onChange={handleChange}
              style={{ width: 208 }}
            >
              <MenuItem value={"/hr"}>Per Hour</MenuItem>
              <MenuItem value={"total"}>Total</MenuItem>
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
                value={start_date}
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
                value={end_date}
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
