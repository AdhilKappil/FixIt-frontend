import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocationState {
  latitude: number;
  longitude: number;
}

export interface ServiceState {
  serviceName: string;
}

const initialLocationState: LocationState = {
  latitude: 0,
  longitude: 0,
};

const initialServiceState: ServiceState = {
  serviceName: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    ...initialLocationState,
    service: initialServiceState,
  },
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setServiceName: (state, action: PayloadAction<string>) => {
      state.service.serviceName = action.payload;
    },
  },
});

export const { setLocation, setServiceName } = locationSlice.actions;

export default locationSlice.reducer;
