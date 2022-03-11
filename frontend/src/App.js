import Map from "react-map-gl";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const App = () => {
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  return (
    <Map
      {...viewState}
      style={{ width: 400, height: 400}}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
};

export default App;
