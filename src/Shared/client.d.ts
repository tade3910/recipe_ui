interface KeyEntry<V> {
  value: V;
  key: string;
}

interface RecipeFormValues {
  title: string;
  ingredients: KeyEntry<string>[];
  instructions: KeyEntry<string>[];
  image: FileWithPath[];
}

interface ClientRecipe {
  title: string;
  imgSrc?: string;
  ingredients: string[];
  instructions: string[];
  url: string;
  owner: string;
}

type ListType = 'ingredients' | 'instructions';
