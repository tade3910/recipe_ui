import { useQuery } from 'react-query';
import { cacheSettings } from '../Util/ApiSettings';
import { randomId } from '@mantine/hooks';

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
    const ingredients: KeyEntry<string>[][] = response.ingredients.map(
      (possibleIngredients) => {
        return possibleIngredients.map((ingredient) => {
          return { value: ingredient, key: randomId() };
        });
      },
    );
    const instructions: KeyEntry<string>[][] = response.instructions.map(
      (possibleInstructions) => {
        return possibleInstructions.map((instruction) => {
          return { value: instruction, key: randomId() };
        });
      },
    );
    return {
      ingredients: ingredients,
      instructions: instructions,
    };
  };
  return {
    ...useQuery(queryKey, parseRecipe, cacheSettings),
  };
}
