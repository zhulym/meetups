import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meetupsReducer from './reducers/MeetupsSlice';
import participantsReducer from './reducers/ParticipantsSlice';
import userReducer from './reducers/UserSlice';
import votedReducer from './reducers/VotedSlice';
import errorsReducer from './reducers/ErrorsSlice';
import newsReducer from './reducers/NewsSlice';

const rootReducer = combineReducers({
  meetupsReducer,
  participantsReducer,
  userReducer,
  votedReducer,
  errorsReducer,
  newsReducer
});

export const setupStore = () => configureStore({
  reducer: rootReducer
});

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
