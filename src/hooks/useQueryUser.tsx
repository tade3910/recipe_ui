import { useQuery } from 'react-query';
import { cacheSettings } from '../Util/QuerySettings';

export default function useQueryUser(user_id: string) {
  const queryKey = ['User', user_id];

  const getUserData = async () => {
    const recipes = [];
    for (let i = 0; i < 6; i++) {
      recipes.push(`user_id${user_id}_index_${i}`);
    }
    const response: User = {
      recipes,
      email: 'omotadeogunmodede@gmail.com',
      name: 'Omotade Ogunmodede',
    };
    return response;
  };
  return {
    ...useQuery(queryKey, getUserData, cacheSettings),
  };
}
