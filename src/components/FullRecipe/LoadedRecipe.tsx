import { Grid, Stack, Title } from '@mantine/core';
import RecipeImage from '../RecipeImage';
import RecipeList from '../RecipeList';
import { useState } from 'react';

interface LoadedRecipeProps {
  recipe: Recipe;
  editing: boolean;
}

export default function LoadedRecipe({ recipe, editing }: LoadedRecipeProps) {
  const [ingredients, setIngredients] = useState<string[]>(recipe.ingredients);
  const [instructions, setInstructions] = useState<string[]>(
    recipe.instructions,
  );
  const ingredientsType = editing ? 'edit' : 'view';
  const instructionsType = editing ? 'edit' : 'check';
  return (
    <Grid>
      <Grid.Col>
        <Stack>
          <RecipeImage imgSrc={recipe.imgSrc} />
          <RecipeList
            items={ingredients}
            title="Ingredients"
            setItems={setIngredients}
            listType={ingredientsType}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col>
        <Stack>
          <Title order={3}>{recipe.title}</Title>
          <RecipeList
            items={instructions}
            title="Instructions"
            setItems={setInstructions}
            listType={instructionsType}
          />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
