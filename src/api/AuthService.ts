// libraries
import axios from 'axios';
// store
import { AppDispatch, store } from 'store/store';
import { userSlice } from 'store/reducers/UserSlice';
import { errorsSlice } from 'store/reducers/ErrorsSlice';
// types
import { FormValues } from 'types/authTypes';
import { UserDataType } from 'types/userType';

export const getUser = () => async (dispatch: AppDispatch) => {
  const path: string = '/api/login';
  try {
    dispatch(errorsSlice.actions.DELETE_ERROR());
    const response = await axios.get<UserDataType>(path, { withCredentials: true });
    dispatch(userSlice.actions.LOG_IN(response.data.user));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
  }
};

export const login = (values: FormValues) => async (dispatch: AppDispatch) => {
  const path: string = '/api/login';
  try {
    dispatch(errorsSlice.actions.DELETE_ERROR());
    const response = await axios.post<UserDataType>(path, values, { withCredentials: true });
    dispatch(userSlice.actions.LOG_IN(response.data.user));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
  }
};

export const logout = async () => {
  const path: string = '/api/logout';
  try {
    await axios.get(path);
  } catch (e) {
    if (e instanceof Error) {
      store.dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
  }
};
