// libraries
import axios from 'axios';
// store
import { AppDispatch, store } from 'store/store';
import { newsSlice } from 'store/reducers/NewsSlice';
import { errorsSlice } from 'store/reducers/ErrorsSlice';
// types
import { NewsType, FormNewsValuesType } from 'types/newsTypes';
import { ToastType } from 'types/generalTypes';
// helpers
import { showToasts } from 'helpers/toasts/toasts';

export const getNews = () => async (dispatch: AppDispatch) => {
  const path: string = '/api/news';
  try {
    dispatch((newsSlice.actions.SET_NEWS_LOADING(true)));
    const response = await axios.get<NewsType[]>(path, { withCredentials: true });
    dispatch((newsSlice.actions.SET_NEWS_DATA(response.data)));
  } catch (e) {
    dispatch((newsSlice.actions.SET_NEWS_LOADING(false)));
    if (e instanceof Error) {
      dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
  }
};

export const createNews = async (data: FormNewsValuesType) => {
  const path: string = '/api/news';
  try {
    await axios.post(path, data, { withCredentials: true });
    showToasts(ToastType.success);
  } catch (e) {
    if (e instanceof Error) {
      store.dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
    showToasts(ToastType.error);
  }
};

export const deleteNews = async (id: string) => {
  const path: string = `/api/news/${id}`;
  try {
    await axios.delete(path, { withCredentials: true });
    showToasts(ToastType.success);
  } catch (e) {
    if (e instanceof Error) {
      store.dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
    showToasts(ToastType.error);
  }
};

export const getNewsItem = async (id: string) => {
  const path: string = `/api/news/${id}`;
  try {
    const response = await axios.get<NewsType>(path, { withCredentials: true });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      store.dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
    showToasts(ToastType.error);
  }
  return null;
};

export const updateNews = async (data: FormNewsValuesType, id: string) => {
  const path: string = `/api/news/${id}`;
  try {
    await axios.put(path, data, { withCredentials: true });
    showToasts(ToastType.success);
  } catch (e) {
    if (e instanceof Error) {
      store.dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
    showToasts(ToastType.error);
  }
};
