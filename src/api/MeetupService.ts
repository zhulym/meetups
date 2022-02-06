// libraries
import axios from 'axios';
// store
import { AppDispatch, store } from 'store/store';
import { meetupsSlice } from 'store/reducers/MeetupsSlice';
import { participantsSlice } from 'store/reducers/ParticipantsSlice';
import { votedSlice } from 'store/reducers/VotedSlice';
import { errorsSlice } from 'store/reducers/ErrorsSlice';
// types
import { UserType, MeetupsType, FormValuesType } from 'types/meetupsTypes';
import { ToastType } from 'types/generalTypes';
// helpers
import { combinedData } from 'helpers/avatarProcessing';
import { showToasts } from 'helpers/toasts/toasts';

export const getMeetups = () => async (dispatch: AppDispatch) => {
  const path: string = '/api/meetups';
  try {
    dispatch((meetupsSlice.actions.SET_MEETUPS_LOADING(true)));
    const response = await axios.get<MeetupsType[]>(path, { withCredentials: true });
    dispatch((meetupsSlice.actions.SET_MEETUPS_DATA(response.data)));
  } catch (e) {
    dispatch((meetupsSlice.actions.SET_MEETUPS_LOADING(false)));
    if (e instanceof Error) {
      dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
  }
};

export const getParticipants = (id: string) => async (dispatch: AppDispatch) => {
  const path: string = `/api/meetups/${id}/participants`;
  try {
    const data = await combinedData(path);
    dispatch((participantsSlice.actions.SET_PARTICIPANTS_DATA(data)));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
  }
};

export const createMeetup = async (data: FormValuesType) => {
  const path: string = '/api/meetups';
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

export const updateMeetup = async (data: FormValuesType) => {
  const path: string = '/api/meetups';
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

export const getMeetup = async (id: string) => {
  const path: string = `/api/meetups/${id}`;
  try {
    const response = await axios.get<MeetupsType>(path, { withCredentials: true });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      store.dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
    showToasts(ToastType.error);
  }
  return null;
};

export const deleteMeetup = async (id: string) => {
  const path: string = `/api/meetups/${id}`;
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

export const addParticipant = async (id: string, data: UserType | null) => {
  const path: string = `/api/meetups/${id}/participants`;
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

export const deleteParticipant = async (id: string) => {
  const path: string = `/api/meetups/${id}/participants`;
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

export const getVoted = (id: string) => async (dispatch: AppDispatch) => {
  const path: string = `/api/meetups/${id}/votedusers`;
  try {
    const response = await axios.get<UserType[]>(path, { withCredentials: true });
    dispatch((votedSlice.actions.SET_VOTED_DATA(response.data)));
  } catch (e) {
    if (e instanceof Error) {
      dispatch(errorsSlice.actions.SET_ERROR(e.message));
    }
  }
};

export const addVoted = async (id: string, data: UserType | null) => {
  const path: string = `/api/meetups/${id}/votedusers`;
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

export const deleteVoted = async (id: string) => {
  const path: string = `/api/meetups/${id}/votedusers`;
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
