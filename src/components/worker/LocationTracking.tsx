import { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, Source, Layer } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { IBooking } from "../../@types/schema";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { IoMdBicycle } from "react-icons/io";
import { IoMdWalk } from "react-icons/io";



const LocationTracking = (props: 
    { bookings: IBooking,  
    setTracking: (value: boolean) => void;  
    }) => {
    const [viewport, setViewport] = useState({
        latitude: props.bookings.latitude,
        longitude: props.bookings.longitude,
        zoom: 8,
        width: '100%',
        height: '400px'
    });

    const [userLocation, setUserLocation] = useState<{ latitude: number | null, longitude: number | null }>({
        latitude: null,
        longitude: null
    });
    const [route, setRoute] = useState<any>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [duration, setDuration] = useState<number | null>(null); // To store travel time
    const [mode, setMode] = useState<'driving' | 'cycling' | 'walking'>('driving'); // Travel mode

    const handleViewportChange = (newViewport: any) => {
        setViewport(newViewport);
    };

    const handleGeolocate = (e: any) => {
        const newLatitude = e.coords.latitude;
        const newLongitude = e.coords.longitude;
        setUserLocation({ latitude: newLatitude, longitude: newLongitude });
        setViewport({
            ...viewport,
            latitude: newLatitude,
            longitude: newLongitude,
            zoom: 12 // Adjust the zoom level when the user's location is found
        });
        fetchDirections(newLatitude, newLongitude, mode);
    };

    const fetchDirections = (startLat: number, startLng: number, mode: 'driving' | 'cycling' | 'walking') => {
        const accessToken: string = import.meta.env.VITE_MAPBOX_TOKEN;
        const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${startLng},${startLat};${props.bookings.longitude},${props.bookings.latitude}?steps=true&geometries=geojson&access_token=${accessToken}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.routes && data.routes.length > 0) {
                    setRoute(data.routes[0].geometry);
                    setDistance(data.routes[0].distance);
                    setDuration(data.routes[0].duration); // Set travel duration
                }
            })
            .catch(error => console.error('Error fetching directions:', error));
    };

    const handleModeChange = (newMode: 'driving' | 'cycling' | 'walking') => {
        setMode(newMode);
        if (userLocation.latitude && userLocation.longitude) {
            fetchDirections(userLocation.latitude, userLocation.longitude, newMode);
        }
    };

    const formatDuration = (duration: number | null) => {
        if (!duration) return '';
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        return `${hours} hr ${minutes} min`;
    };

    const distanceInKm = distance ? (distance / 1000).toFixed(2) : null;
    const durationFormatted = duration ? formatDuration(duration) : null;

    return (
        <div>
            <button onClick={()=>props.setTracking(false)} className='text-blue-600 font-Sans font-semibold text-xl'>Back</button>
            <div className="w-full h-full mt-5" style={{ height: '400px' }}>
                <ReactMapGL
                    {...viewport}
                    mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    onMove={evt => handleViewportChange(evt.viewState)}
                >
                    <Marker latitude={props.bookings.latitude} longitude={props.bookings.longitude}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 h-7" style={{ color: 'red', border: '2px solid #003e29', borderRadius: '50%' }} />
                    </Marker>
                    {userLocation.latitude && userLocation.longitude && (
                        <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
                            <div style={{
                                background: 'green',
                                height: '20px',
                                width: '20px',
                                borderRadius: '50%',
                                border: '5px solid white'
                            }}></div>
                        </Marker>
                    )}
                    {route && (
                        <Source id="route" type="geojson" data={route}>
                            <Layer
                                id="route"
                                type="line"
                                paint={{
                                    'line-color': '#064749',
                                    'line-width': 4
                                }}
                            />
                        </Source>
                    )}
                    <NavigationControl style={{ right: 10, top: 10 }} />
                    <GeolocateControl
                        position="top-left"
                        trackUserLocation={true}
                        onGeolocate={handleGeolocate}
                    />
                </ReactMapGL>
            </div>
           <div className='flex justify-between mt-3 items-center'>
           <div className="mt-3 flex items-center">
                <button onClick={() => handleModeChange('driving')} className={`mr-2 rounded-md px-4 py-2 ${mode === 'driving' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                    <p className='flex items-center gap-2'><RiMotorbikeFill/> or <FaCar/></p>
                </button>
                <button onClick={() => handleModeChange('cycling')} className={`mr-2 px-4 rounded-md py-2 ${mode === 'cycling' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                  <IoMdBicycle size={23}/>
                </button>
                <button onClick={() => handleModeChange('walking')} className={`px-4 py-2 rounded-md ${mode === 'walking' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                   <IoMdWalk size={23}/>
                </button> 
            </div>
            <div>
                    {durationFormatted && distanceInKm && (
                        <p className="font-Sans text-primary font-bold">
                            Estimated Time: <span className="text-yellow-500">{durationFormatted}</span> ({distanceInKm} km)
                        </p>
                    )}
                </div>
           </div>
        </div>
    );
};

export default LocationTracking;
