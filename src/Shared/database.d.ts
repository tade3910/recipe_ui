interface Recipe {
  title: string;
  imgSrc?: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
}

interface User {
  recipes: string[];
  email: string;
  name: string;
}
