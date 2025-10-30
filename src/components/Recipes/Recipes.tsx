import type { QueryStatus } from 'react-query';
import DataComponent from '../DataComponent';
import LoadingRecipes from './LoadingRecipes';
import LoadedRecipes from './LoadedRecipes';

interface RecipesParams {
  status: QueryStatus;
  data: string[];
}

export default function Recipes({ status, data }: RecipesParams) {
  return (
    <DataComponent
      status={status}
      loadingComponent={<LoadingRecipes />}
      successComponent={<LoadedRecipes recipeIds={data} />}
    />
  );
}
