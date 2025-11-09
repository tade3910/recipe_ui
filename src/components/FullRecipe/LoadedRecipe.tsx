import { SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import RecipeImage from '../RecipeImage';
import ItemList from '../ItemList';
import type { UseFormReturnType } from '@mantine/form';
import ImageDropZone from '../ImageDropZone';
import type { FileWithPath } from '@mantine/dropzone';

interface NoEditRecipeProps {
  editing: false;
  recipe: Recipe;
}

interface EditRecipeProps {
  editing: true;
  form: UseFormReturnType<
    RecipeFormValues,
    (values: RecipeFormValues) => RecipeFormValues
  >;
}

export default function LoadedRecipe(
  props: NoEditRecipeProps | EditRecipeProps,
) {
  function setImage(files: FileWithPath[]) {
    if (props.editing) {
      props.form.setFieldValue('image', files);
    }
  }

  return (
    <SimpleGrid cols={2}>
      <Stack>
        {props.editing ? (
          <>
            <ImageDropZone
              files={props.form.getValues()['image']}
              setFiles={setImage}
            />
            <ItemList
              title="Instructions"
              edit={props.editing}
              form={props.form}
              listType="instructions"
            />
          </>
        ) : (
          <>
            <RecipeImage imgSrc={props.recipe.imgSrc} />
            <ItemList
              title="Instructions"
              edit={props.editing}
              items={props.recipe.instructions}
              listType="instructions"
            />
          </>
        )}
      </Stack>
      <Stack>
        {props.editing ? (
          <>
            <TextInput
              label="Title"
              {...props.form.getInputProps('title')}
              styles={{
                input: {
                  height: '10vh',
                  fontSize: '1.5rem',
                },
              }}
            />
            <ItemList
              title="Ingredients"
              edit={props.editing}
              form={props.form}
              listType="ingredients"
            />
          </>
        ) : (
          <>
            <Title order={3}>{props.recipe.title}</Title>
            <ItemList
              listType="ingredients"
              title="Ingredients"
              edit={props.editing}
              items={props.recipe.instructions}
            />
          </>
        )}
      </Stack>
    </SimpleGrid>
  );
}
