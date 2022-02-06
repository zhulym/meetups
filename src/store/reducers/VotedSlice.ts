import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'types/meetupsTypes';

type VotedState = {
  voted: UserType[];
  isLoading: boolean;
};

const initialState: VotedState = {
  voted: [],
  isLoading: false,
};

// in redux toolkit reducers are called 'slices'
export const votedSlice = createSlice({
  name: 'voted',
  initialState,
  reducers: {
    SET_VOTED_LOADING(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    SET_VOTED_DATA(state, action: PayloadAction<UserType[]>) {
      state.isLoading = false;
      state.voted = action.payload;
    },
  }
});

export default votedSlice.reducer;
