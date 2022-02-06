import axios from 'axios';
import { UserType } from 'types/userType';

export const combinedData = async (path: string) => {
  const avatarUrl = `https://api.unsplash.com/search/photos?query=face&per_page=10&client_id=6O0wwq-eS8WxsvS4jQPcW3KVGdMhQf-PmY5qvRpYOn8`;
  const [response, responseAvatars] = await Promise.all([
    axios.get(path, { withCredentials: true }),
    axios.get(avatarUrl)
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const avatars = responseAvatars.data.results.map((el: any) => el.urls.thumb);
  const data = response.data.map((item: UserType, i: number) => ({
    ...item,
    avatar: avatars[i],
  }));

  return data;
};
