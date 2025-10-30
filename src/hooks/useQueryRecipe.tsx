import { useQuery } from 'react-query';
import { cacheSettings } from '../Util/QuerySettings';

export default function useQueryRecipe(id: string) {
  const queryKey = ['Recipe', id];

  const getRecipeDate = async () => {
    const response: Recipe = {
      description: `This is the desciprtion of recipe with id:${id}`,
      title: `Recipe: ${id}`,
      ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
      instructions: ['Instruction 1', 'Instruction 2', 'Instruction 3'],
      imgSrc:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    };
    return response;
  };
  return {
    ...useQuery(queryKey, getRecipeDate, cacheSettings),
  };
}
