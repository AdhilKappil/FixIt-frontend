import { Box } from "@mui/material";
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { setLocation } from "../../../slices/booking";
import { RootState } from "../../../app/store";
import Geocoder from "./Geocoder";
import BookingProgess from "./BookingProgess";
import { useNavigate } from "react-router-dom";
const AddLocation = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useSelector((state: RootState) => state.location);
  const mapRef = useRef<any>(null);
  const navigate = useNavigate()


  useEffect(() => {
    if (latitude === 0 && longitude === 0) {
      fetch('https://ipapi.co/json')
        .then((response) => response.json())
        .then((data) => {
          mapRef.current?.flyTo({ center: [data.longitude, data.latitude] });
          dispatch(setLocation({ latitude: data.latitude, longitude: data.longitude }));
        });
    }
  }, [latitude, longitude, dispatch]);

  const handleDragEnd = (e: any) => {
    dispatch(setLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng }));
  };

  const handleGeolocate = (e: any) => {
    dispatch(setLocation({ latitude: e.coords.latitude, longitude: e.coords.longitude }));
  };
  

  return (
    <>
      <Navbar />
      <BookingProgess/>
      <div className="pt-10 md:px-20 px-5">
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <ReactMapGL
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            initialViewState={{
              longitude,
              latitude,
              zoom: 8,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            <Marker
              latitude={latitude}
              longitude={longitude}
              draggable
              onDragEnd={handleDragEnd}
            />
            <NavigationControl position="bottom-right" />
            <GeolocateControl
              position="top-left"
              trackUserLocation
              onGeolocate={handleGeolocate}
            />
            <Geocoder/>
          </ReactMapGL>
        </Box>
        <div className="flex justify-around p-5">
        <button className="text-gray-400 font-bold text-xl">Back</button>
        <button onClick={()=>navigate('/addBookingDetails')} className="text-blue-600 font-bold text-xl">Next</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddLocation;