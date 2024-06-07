import { createSlice } from '@reduxjs/toolkit';

// Initial state for the boolean field
const initialState = {
  value: false,
};

// Create the slice
const liveSlice = createSlice({
  name: 'live',
  initialState,
  reducers: {
    // Toggle the boolean field
    live: (state) => {
      state.value = !state.value;
    },
  },
});

// Export actions
export const { live } = liveSlice.actions;

// Export the reducer
export default liveSlice.reducer;