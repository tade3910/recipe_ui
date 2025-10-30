import useQueryUser from '../hooks/useQueryUser';
import Recipes from '../components/Recipes/Recipes';
import { useEffect, useState } from 'react';

function HomePage() {
  const { data, status } = useQueryUser('user_id');
  const [recipes, setRecipes] = useState<string[]>([]);

  useEffect(() => {
    if (status == 'success') {
      setRecipes(data.recipes);
    } else {
      setRecipes([]);
    }
  }, [status]);

  return <Recipes status={status} data={recipes} />;
}

export default HomePage;
