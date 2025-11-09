import Recipes from '../components/Recipes/Recipes';
import { useEffect, useState } from 'react';
import useQueryRecipes from '../hooks/useQueryRecipes';
import { useAuth } from '../Context/AuthContext';

function HomePage() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const { data, status } = useQueryRecipes(user!.userid, page); //This is a protected route, user will be there
  const [recipes, setRecipes] = useState<string[]>([]);

  useEffect(() => {
    if (status == 'success') {
      setRecipes(data);
    } else {
      setRecipes([]);
    }
  }, [status]);

  return <Recipes status={status} data={recipes} />;
}

export default HomePage;
