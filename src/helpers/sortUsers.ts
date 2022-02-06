import { UserType } from 'types/meetupsTypes';

const getDisplayedUsers = (array: UserType[], maxLength: number) => {
  if (array.length <= maxLength) {
    return array;
  }
  return array.slice(0, maxLength);
};

export const sortUsers = (
  participants: UserType[],
  maxDisplayedUsers: number,
  id?: string
) => {
  if (!participants.length) {
    return [];
  }

  if (!id) {
    return getDisplayedUsers(participants, maxDisplayedUsers);
  }

  const currentParticipant = participants.find(item => item.id === id);

  if (!currentParticipant) {
    return getDisplayedUsers(participants, maxDisplayedUsers);
  }

  const filteredParticipants = participants.filter(item => item.id !== id);
  const restParticipants = getDisplayedUsers(filteredParticipants, maxDisplayedUsers - 1);
  return [currentParticipant, ...restParticipants];
};
