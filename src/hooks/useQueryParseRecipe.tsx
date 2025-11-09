import { useQuery } from 'react-query';
import { cacheSettings } from '../Util/ApiSettings';

export default function useQueryParseRecipe(url: string) {
  const queryKey = ['parseRecipe', url];

  const parseRecipe = async () => {
    const response = {
      ingredients: [
        ['2 eggs', '350g flour'],
        ['1 cup milk', '200g sugar'],
        ['2 eggs', '200g sugar'],
      ],
      instructions: [
        ['mix ingredients', 'bake at 350'],
        ['bake at 350', 'Get all the recipes'],
      ],
    };
    return response;
  };
  return {
    ...useQuery(queryKey, parseRecipe, cacheSettings),
  };
}
