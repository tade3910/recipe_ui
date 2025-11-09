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

type ListType = 'ingredients' | 'instructions';
