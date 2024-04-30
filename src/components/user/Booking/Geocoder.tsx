import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../slices/booking';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = () => {
  const dispatch = useDispatch();

  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
    marker: false,
    collapsed: true,
  });

  useControl(() => ctrl);

  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    dispatch(setLocation({ latitude: coords[1], longitude: coords[0] }));
  });

  return null;
};

export default Geocoder;
