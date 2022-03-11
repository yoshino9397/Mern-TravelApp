import React, { useState, useEffect } from "react";
import axios from "axios";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./app.css";
import PushPinIcon from "@mui/icons-material/PushPin";
import StarIcon from "@mui/icons-material/Star";

const App = () => {
  const [showPopup, setShowPopup] = React.useState(true);
  const [pins, setPins] = useState([]);
  const [viewState, setViewState] = React.useState({
    longitude: 12,
    latitude: 55,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <Map
      {...viewState}
      style={{ width: "100vw", height: "100vh" }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/yoshino9397/cl0lvkbjj000e14qrtge2zsss"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {pins.map((p) => (
        <>
          <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
            <PushPinIcon
              sx={{ fontSize: viewState.zoom * 7, color: "#4b666e" }}
            />
          </Marker>
          {showPopup && (
            <Popup
              longitude={12}
              latitude={55}
              anchor="left"
              onClose={() => setShowPopup(false)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">Louisiana Museum of Modern Art</h4>
                <label>Review</label>
                <p className="desc">Beautiful Museum</p>
                <label>Rating</label>
                <div className="stars">
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                  <StarIcon className="star" />
                </div>
                <label>Info</label>
                <span className="username">
                  Created by <b>yoshino</b>
                </span>
                <span className="date">1 hour ago</span>
              </div>
            </Popup>
          )}
        </>
      ))}
    </Map>
  );
};

export default App;
