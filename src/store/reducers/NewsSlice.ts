import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsType } from 'types/newsTypes';

type NewsState = {
  news: NewsType[];
  isLoading: boolean;
};

const initialState: NewsState = {
  news: [],
  isLoading: false,
};

// in redux toolkit reducers are called 'slices'
export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    SET_NEWS_LOADING(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    SET_NEWS_DATA(state, action: PayloadAction<NewsType[]>) {
      state.isLoading = false;
      state.news = action.payload;
    },
  }
});

export default newsSlice.reducer;
