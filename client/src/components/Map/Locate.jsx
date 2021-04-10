
import MyLocationIcon from "@material-ui/icons/MyLocation";


export default function Locate({ panTo }) {
 
  return (
    <button
      className="locate"
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
      <MyLocationIcon className="locateIcon"/>
    </button>
  );
}
