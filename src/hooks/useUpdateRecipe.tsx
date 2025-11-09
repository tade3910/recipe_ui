import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { APIURL } from '../Util/ApiSettings';

/**
 * Hook to update a recipe
 * @returns updated recipe
 */
function useUpdateRecipe() {
  const queryClient = useQueryClient();

  const updateRecipe = async (recipe:ClientRecipe) => {
    try {
      const url = `${APIURL}/recipe?=${recipe.url}`;
      const data = await axios.put(url,recipe);
      return data.data;
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation(
    (recipe:ClientRecipe) => {
      return updateRecipe(recipe);
    },
    {
      onSuccess: (recipe:Recipe) => {
        //Invalid recipes and recipe
        queryClient.invalidateQueries('Recipes');
        queryClient.invalidateQueries(['Recipe', recipe.id])
      },
    }
  );

  return {
    updateRecipeMutation: mutation,
  };
}

export default useUpdateRecipe;
