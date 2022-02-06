import axios from 'axios';
import { MeetupsType, UserType } from 'types/meetupsTypes';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const meetups: MeetupsType[] = [
  {
    id: "2de0306f-a712-4078-b1f0-b223c2f4246b",
    modified: "2021-08-27T04:38:33.816Z",
    start: "2022-06-09T23:35:47.068Z",
    finish: "2022-06-10T02:51:47.068Z",
    author: {
      id: "b4ba2b84-521f-4645-9cc3-518b8a35cda3",
      name: "employee",
      surname: "Gerlach"
    },
    "speakers": [{
      id: "b4ba2b84-521f-4645-9cc3-518b8a35cda3",
      name: "employee",
      surname: "Gerlach"
    }],
    subject: "Reverse-engineered even-keeled standardization",
    excerpt: "Nemo pariatur dolores ut vero velit non. Quidem temporibus quod nihil amet recusandae atque provident voluptatum iste. Aut architecto cum sit rerum aliquam maxime. Ratione voluptate optio id molestias quia quidem ipsam. Eius voluptatem quia dolores enim assumenda. Consequuntur cupiditate error earum hic est numquam vero.",
    place: "630 Goyette Causeway",
    goCount: 64,
    status: "DRAFT",
    isOver: false,
    image: ""
  },
];
const participants: UserType[] = [
  {
    id: "b4ba2b84-521f-4645-9cc3-518b8a35cda3",
    name: "Lavern",
    surname: "Gerlach",
  },
];

const meetupId: string = '2de0306f-a712-4078-b1f0-b223c2f4246b';

const getMeetups = async () => {
  const response = await axios.get<MeetupsType[]>('/api/meetups');
  return response.data;
};
const getParticipants = async () => {
  const response = await axios.get<UserType[]>(`/api/meetups/${meetupId}/participants`);
  return response.data;
};

describe('Get data for meetups', () => {
  test('should to get meetups list', async () => {
    Object(mockedAxios.get).mockReturnValueOnce({ data: meetups });
    const result = await getMeetups();
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/meetups');
    expect(result).toEqual(meetups);
  });

  test('should to get participants list', async () => {
    Object(mockedAxios.get).mockReturnValueOnce({ data: participants });
    const result = await getParticipants();
    expect(mockedAxios.get).toHaveBeenCalledWith(`/api/meetups/${meetupId}/participants`);
    expect(result).toEqual(participants);
  });
});
