import { useParams } from 'react-router-dom';
import useQueryRecipe from '../hooks/useQueryRecipe';
import LoadedRecipe from '../components/FullRecipe/LoadedRecipe';
import DataComponent from '../components/DataComponent';
import LoadingRecipe from '../components/FullRecipe/LoadingRecipe';

export default function RecipePage() {
  const { id } = useParams<string>();
  const { data, status } = useQueryRecipe(id!);
  return (
    <DataComponent
      status={status}
      successComponent={<LoadedRecipe recipe={data!} editing={false} />}
      loadingComponent={<LoadingRecipe />}
    />
  );
}
