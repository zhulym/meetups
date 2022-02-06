import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'types/userType';

type UserState = {
  user: UserType | null;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
};

// in redux toolkit reducers are called 'slices'
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER_LOADING(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    LOG_IN(state, action: PayloadAction<UserType>) {
      state.isLoading = false;
      state.user = action.payload;
    },
    LOG_OUT(state) {
      state.user = null;
    },
  }
});

export default userSlice.reducer;
