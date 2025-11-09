import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { APIURL } from '../Util/ApiSettings';

/**
 * Hook to delete a booking
 * @returns deleted booking
 */
function useCreateRecipe() {
  const queryClient = useQueryClient();

  const createRecipe = async (info: ClientRecipe) => {
    try {
      const url = `${APIURL}/recipe/`;
      const data = await axios.post(url, info);
      return data.data;
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation(
    (info: ClientRecipe) => {
      return createRecipe(info);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Recipes');
      },
    },
  );

  return {
    createRecipeMutation: mutation,
  };
}

export default useCreateRecipe;
