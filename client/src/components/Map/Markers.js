import { Marker, InfoWindow } from "@react-google-maps/api";
// import "./Map.css";

export default function Markers({
  selected,
  setSelected,
  coord,
  jobMarkers,
  state,
}) {
  const icon = Object.values(state.categories);
  return (
    <>
      {jobMarkers.map((job) => (
        <Marker
          key={job.id}
          position={{ lat: job.lat, lng: job.lng }}
          icon={{
            url: icon[job.category_id - 1].marker,
            scaledSize: new window.google.maps.Size(20, 20),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(10, 10),
          }}
          onClick={() => {
            setSelected(job);
          }}
        />
      ))}
      {state.jobView === "POST" && (
        <Marker
          icon={{
            url: "./map-pin-solid.svg",
            scaledSize: new window.google.maps.Size(20, 20),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(10, 10),
          }}
          position={{ lat: coord.lat, lng: coord.lng }}
          onChange={() => {
            setSelected(coord);
          }}
        />
      )}
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <h2>{selected.name}</h2>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
