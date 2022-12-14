import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = [];

export const getRockets = createAsyncThunk(
  'rockets/getRockets',
  async () => {
    const response = await fetch('https://api.spacexdata.com/v3/rockets');
    const responseJson = await response.json();
    return responseJson;
  },
);

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket(state, action) {
      const newState = state.map((rocket) => {
        if (rocket.id !== action.payload) { return rocket; }
        return { ...rocket, reserved: true };
      });
      return newState;
    },
    cancelReservation(state, action) {
      const newState = state.map((rocket) => {
        if (rocket.id !== action.payload) { return rocket; }
        return { ...rocket, reserved: false };
      });
      return newState;
    },
  },
  extraReducers: {
    [getRockets.fulfilled]: (state, action) => action.payload.map((element) => (
      {
        id: element.id,
        rocket_name: element.rocket_name,
        description: element.description,
        flickr_images: element.flickr_images,
      }
    )),
  },
});

export default rocketsSlice.reducer;
export const { reserveRocket, cancelReservation } = rocketsSlice.actions;
