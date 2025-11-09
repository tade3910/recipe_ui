interface Recipe {
  title: string;
  imgSrc?: string;
  ingredients: string[];
  instructions: string[];
  Url: string;
}

interface User {
  token: string;
  exp: number;
  email: string;
  name: string;
  userid: string;
}
