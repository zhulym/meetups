import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ErrorsState = {
  errors: string;
};

const initialState: ErrorsState = {
  errors: '',
};

// in redux toolkit reducers are called 'slices'
export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    SET_ERROR(state, action: PayloadAction<string>) {
      state.errors = action.payload;
    },
    DELETE_ERROR(state) {
      state.errors = '';
    }
  }
});

export default errorsSlice.reducer;
