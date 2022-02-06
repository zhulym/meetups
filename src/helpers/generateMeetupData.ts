import { FormValuesType } from 'types/meetupsTypes';
import { UserType } from 'types/userType';
import faker from "faker";

export const generateMeetupData = (
  data: FormValuesType,
  user: UserType | null,
  id: string
) => {
  let values = data;
  const { speaker } = data;
  delete values.speaker;

  values = {
    ...data,
    id,
    modified: new Date().toISOString(),
    author: {
      id: user?.id || '',
      name: user?.name || '',
      surname: user?.surname || ''
    },
    speakers: [
      {
        id: faker.datatype.uuid(),
        name: speaker?.split(' ')[0] || '',
        surname: speaker?.split(' ')[1] || '',
      }
    ],
  };
  return values;
};
