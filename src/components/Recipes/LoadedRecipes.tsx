import { SimpleGrid } from '@mantine/core';
import RecipeCard from '../RecipeCard';

interface LoadedRecipesParams {
  recipeIds: string[];
}
export default function LoadedRecipes({ recipeIds }: LoadedRecipesParams) {
  return (
    <SimpleGrid cols={3}>
      {recipeIds.map((recipeId) => (
        <RecipeCard id={recipeId} key={recipeId} />
      ))}
    </SimpleGrid>
  );
}
