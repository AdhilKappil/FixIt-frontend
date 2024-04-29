import { Box } from "@mui/material"

import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
// import { useValue } from '../../../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
// import Geocoder from './Geocoder';

const AddLocation = () => {
//   const {
//     state: {
//       location: { lng, lat },
//     },
//     dispatch,
//   } = useValue();

interface Location {
    latitude: number;
    longitude: number;
  }
  
    const [location, setLocation] = useState<Location>({
      latitude: 0,
      longitude: 0,
    });
    const mapRef = useRef<any>(null); // Assuming a map library with a flyTo method
  
    useEffect(() => {
      if (!location.latitude && !location.longitude) {
        fetch('https://ipapi.co/json')
          .then((response) => response.json())
          .then((data: { latitude: number; longitude: number }) => { // Type assertion for clarity
            mapRef.current?.flyTo({ center: [data.longitude, data.latitude] });
            setLocation({ latitude: data.latitude, longitude: data.longitude });
          });
      }
    }, []);
  return (
  <div>
    <Navbar/>
     <div className="p-10">
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
        longitude: location.longitude,
        latitude: location.latitude,
        zoom: 8,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker
        latitude={location.latitude}
        longitude={location.longitude}
        draggable
        onDragEnd={(e) =>
          setLocation((prevLocation) => ({
            ...prevLocation,
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
          }))
        }
      />
      <NavigationControl position="bottom-right" />
      <GeolocateControl
        position="top-left"
        trackUserLocation
        onGeolocate={(e) =>
          setLocation((prevLocation) => ({
            ...prevLocation,
            longitude: e.coords.longitude,
            latitude: e.coords.latitude,
          }))
        }
      />
      {/* <Geocoder/> */}
    </ReactMapGL>
  </Box>
   </div>
   <Footer/>
  </div>
  );
};

export default AddLocation;