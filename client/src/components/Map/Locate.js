// import "./Map.css";
export default function Locate({ panTo }) {
  return (
    <button
      className="find-me"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img className="compass" src="./compass-regular.svg" alt="my location" />
    </button>
  );
}
