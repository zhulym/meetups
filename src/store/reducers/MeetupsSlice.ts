import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeetupsType } from 'types/meetupsTypes';

type MeetupsState = {
  meetups: MeetupsType[];
  isLoading: boolean;
};

const initialState: MeetupsState = {
  meetups: [],
  isLoading: false,
};

// in redux toolkit reducers are called 'slices'
export const meetupsSlice = createSlice({
  name: 'meetup',
  initialState,
  reducers: {
    SET_MEETUPS_LOADING(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    SET_MEETUPS_DATA(state, action: PayloadAction<MeetupsType[]>) {
      state.isLoading = false;
      state.meetups = action.payload;
    },
  }
});

export default meetupsSlice.reducer;
