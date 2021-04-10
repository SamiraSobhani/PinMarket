import { makeStyles } from "@material-ui/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";

const useStyles = makeStyles(() => ({
  locate: {
    position: "absolute",
    top: "10rem",
    right: "18rem",
    background: "none",
    border: "none",
    zIndex: "1",
    color:"red"
  },
  icon: {
    cursor: "pointer",
    fontSize: "2.5rem",
  },
}));

export default function Locate({ panTo }) {
  const classes = useStyles();
  return (
    <button
      className={classes.locate}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log({position});
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <MyLocationIcon className={classes.icon} />
    </button>
  );
}
