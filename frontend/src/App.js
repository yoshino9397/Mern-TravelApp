import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./app.css";
import PushPinIcon from "@mui/icons-material/PushPin";
import StarIcon from "@mui/icons-material/Star";
import Register from "./components/Register";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [pins, setPins] = useState([]);
  const [viewState, setViewState] = React.useState({
    longitude: 12,
    latitude: 55,
    zoom: 4,
    bearing: 0,
    pitch: 50,
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

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
    ///Even if you click the pin at the edge of the screen, it will move to the center!
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      lat: lat,
      long: lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Map
      {...viewState}
      style={{
        width: "100vw",
        height: "100vh",
        transitionDuration: 200,
      }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/yoshino9397/cl0lvkbjj000e14qrtge2zsss"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      onDblClick={handleAddClick}
    >
      {pins.map((p) => (
        <>
          <Marker
            longitude={p.long}
            latitude={p.lat}
            anchor="bottom"
            offsetLeft={-3.5 * viewState.zoom}
            offsetTop={-7 * viewState.zoom}
          >
            <PushPinIcon
              sx={{
                fontSize: viewState.zoom * 7,
                color: currentUser === p.username ? "tomato" : "#4b666e",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup
              longitude={p.long}
              latitude={p.lat}
              anchor="left"
              // onClose={() => setCurrentPlaceId(null)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  {Array(p.rating).fill(<StarIcon className="star" />)}
                </div>
                <label>Info</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
          )}
        </>
      ))}
      {newPlace && (
        <Popup
          longitude={newPlace.long}
          latitude={newPlace.lat}
          anchor="left"
          // onClose={() => setCurrentPlaceId(null)}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                placeholder="enter a title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Review</label>
              <textarea
                placeholder="Say us something about this place"
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>Rating</label>
              <select onChange={(e) => setStar(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">
                Add Pin
              </button>
            </form>
          </div>
        </Popup>
      )}
      {currentUser ? (
        <button className="button logout">Log out</button>
      ) : (
        <div className="buttons">
          <button className="button login">Login</button>
          <button className="button register">Register</button>
        </div>
      )}
      <Register />
    </Map>
  );
};

export default App;
