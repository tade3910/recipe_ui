import { useQuery } from 'react-query';
import { cacheSettings } from '../Util/ApiSettings';

export default function useQueryBookmarks(user_id: string, page: string) {
  const queryKey = ['Recipes', user_id, page];

  const getBookmarkRecipes = async () => {
    const response: string[] = [];
    for (let i = 0; i < 6; i++) {
      response.push(`user_id${user_id}_page_${page}_index_${i}`); //sudo ids
    }
    return response;
  };
  return {
    ...useQuery(queryKey, getBookmarkRecipes, cacheSettings),
  };
}
