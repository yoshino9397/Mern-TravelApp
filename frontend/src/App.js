import React from "react";
import Map from "react-map-gl";
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
      style={{ width: 400, height: 400 }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/yoshino9397/cl0lvkbjj000e14qrtge2zsss"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    />
  );
};

export default App;
