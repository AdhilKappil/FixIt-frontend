import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocationState {
  latitude: number;
  longitude: number;
}

export interface ServiceState {
  serviceName: string;
  serviceImg: string;
  firstHourCharge : number;
  laterHourCharge : number;
}

const initialLocationState: LocationState = {
  latitude: 0,
  longitude: 0,
};

const initialServiceState: ServiceState = {
  serviceName: '',
  serviceImg: '',
  firstHourCharge : 0,
  laterHourCharge : 0
};

// interface StartWorkState {
//   startWork: boolean;
// }

// const initialStartWorkState: StartWorkState = {
//   startWork: false,
// };

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    ...initialLocationState,
    service: initialServiceState,
    // startWork: initialStartWorkState.startWork,
  },
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setServiceDetails: (state, action: PayloadAction<ServiceState>) => {
      state.service = action.payload;
    },
    // setStartWork: (state) => {
    //   state.startWork = true;
    // },
   
  },
});

export const { setLocation, setServiceDetails } = locationSlice.actions;

export default locationSlice.reducer;
