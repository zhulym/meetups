import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'types/meetupsTypes';

type ParticipantsState = {
  participants: UserType[];
  isLoading: boolean;
};

const initialState: ParticipantsState = {
  participants: [],
  isLoading: false,
};

// in redux toolkit reducers are called 'slices'
export const participantsSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    SET_PARTICIPANTS_LOADING(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    SET_PARTICIPANTS_DATA(state, action: PayloadAction<UserType[]>) {
      state.isLoading = false;
      state.participants = action.payload;
    },
  }
});

export default participantsSlice.reducer;
