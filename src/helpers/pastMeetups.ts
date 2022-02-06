import { MeetupsType } from 'types/meetupsTypes';

export function filterPastMeetups(item: MeetupsType) {
  return new Date().getTime() >= new Date(item.finish).getTime();
}
