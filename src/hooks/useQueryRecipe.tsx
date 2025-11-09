import { useQuery } from 'react-query';
import { cacheSettings } from '../Util/ApiSettings';
import { randomId } from '@mantine/hooks';

export default function useQueryRecipe(id: string) {
  const queryKey = ['Recipe', id];

  const getRecipeData = async () => {
    const response: Recipe = {
      url: 'some_url.com',
      title: `Recipe: ${id}`,
      ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
      instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3'],
      imgSrc:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
      owner: 'omotadeogunmodede@gmail.com',
      id:randomId()
    };
    return response;
  };
  return {
    ...useQuery(queryKey, getRecipeData, cacheSettings),
  };
}
