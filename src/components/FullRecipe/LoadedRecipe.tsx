import { Button, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import RecipeImage from '../RecipeImage';
import ItemList from '../ItemList';
import { useForm, type UseFormReturnType } from '@mantine/form';
import ImageDropZone from '../ImageDropZone';
import type { FileWithPath } from '@mantine/dropzone';
import useCreateRecipe from '../../hooks/useCreateRecipe';
import { useEffect, useState } from 'react';
import { createMyNotification, updateMyNotification } from '../../Util/notifiy';
import { useAuth } from '../../Context/AuthContext';
import { randomId } from '@mantine/hooks';
import useUpdateRecipe from '../../hooks/useUpdateRecipe';

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
  url: string;
}

export default function LoadedRecipe(
  props: NoEditRecipeProps | EditRecipeProps,
) {
  const { createRecipeMutation } = useCreateRecipe();
  const { updateRecipeMutation } = useUpdateRecipe();
  const [updateId, setUpdatedId] = useState<string | undefined>(undefined);
  const [editing, setEditting] = useState<boolean>(props.editing);

  const form = props.editing
    ? props.form
    : useForm<RecipeFormValues>({
        initialValues: {
          title: props.recipe.title,
          ingredients: props.recipe.ingredients.map((ingredient) => ({
            value: ingredient,
            key: randomId(),
          })),
          instructions: props.recipe.instructions.map((instruction) => ({
            value: instruction,
            key: randomId(),
          })),
          image: [],
        },
        validate: {
          // top-level title validation
          title: (value) =>
            value.length < 4 ? 'Title must have at least 4 characters' : null,
        },
      });

  const { user } = useAuth();

  useEffect(() => {
    if (updateId == undefined) {
      //Really should never be here
      return;
    }
    if (createRecipeMutation.isSuccess) {
      updateMyNotification(
        'success',
        updateId,
        'Recipe was succesully loaded',
        'Notification will close in 2 seconds, you can close this notification now',
      );
      setUpdatedId(undefined);
    } else if (createRecipeMutation.isError) {
      updateMyNotification(
        'error',
        updateId,
        'There was some error creating the recipe',
        'I prolly messed up... oops :(',
      );
      setUpdatedId(undefined);
    }
  }, [createRecipeMutation]);

  useEffect(() => {
    if (updateId == undefined) {
      //Really should never be here
      return;
    }
    if (updateRecipeMutation.isSuccess) {
      updateMyNotification(
        'success',
        updateId,
        'Recipe was succesully updated',
        'Notification will close in 2 seconds, you can close this notification now',
      );
      setUpdatedId(undefined);
    } else if (updateRecipeMutation.isError) {
      updateMyNotification(
        'error',
        updateId,
        'There was some error updating the recipe',
        'I prolly messed up... oops :(',
      );
      setUpdatedId(undefined);
    }
  }, [updateRecipeMutation]);

  function submit() {
    if (form.validate().hasErrors) {
      return;
    }
    let invalid = false;
    const values = form.getValues();
    if (values.ingredients.length == 0) {
      createMyNotification(
        'error',
        'Ingredients are missing',
        'Please add at least one ingredient to recipe',
      );
      invalid = true;
    }
    if (values.instructions.length == 0) {
      createMyNotification(
        'error',
        'Instructions are missing',
        'Please add at least one instruction to recipe',
      );
      invalid = true;
    }
    if (invalid) {
      return;
    }
    if (props.editing) {
      const createdRecipe: ClientRecipe = {
        title: values.title,
        ingredients: values.ingredients.map((val) => val.value),
        instructions: values.instructions.map((val) => val.value),
        url: props.url,
        owner: user!.email,
      };
      createRecipeMutation.mutate(createdRecipe);
      setUpdatedId(
        createMyNotification(
          'loading',
          'Recipe Processed',
          'Attempting to post your recipe',
        ),
      );
    } else {
      //Updating
      const updatedRecipe: ClientRecipe = {
        title: values.title,
        ingredients: values.ingredients.map((val) => val.value),
        instructions: values.instructions.map((val) => val.value),
        url: props.recipe.url,
        owner: user!.email,
      };
      updateRecipeMutation.mutate(updatedRecipe);
      setUpdatedId(
        createMyNotification(
          'loading',
          'Recipe Processed',
          'Attempting to update your recipe',
        ),
      );
    }
  }

  function setImage(files: FileWithPath[]) {
    if (props.editing) {
      props.form.setFieldValue('image', files);
    }
  }

  function FormButtons() {
    if (!props.editing) {
      if (!editing && user?.email == props.recipe.owner) {
        return <Button onClick={() => setEditting(true)}>Edit</Button>;
      }
      if (editing) {
        return (
          <>
            <Button
              type="submit"
              onClick={submit}
              disabled={updateId != undefined}
            >
              Submit
            </Button>
            <Button
              color="gray"
              onClick={() => {
                form.reset();
                setEditting(false);
              }}
              disabled={updateId != undefined}
            >
              Cancel
            </Button>
          </>
        );
      }
    } else {
      return (
        <>
          <Button
            type="submit"
            onClick={submit}
            disabled={updateId != undefined}
          >
            Submit
          </Button>
          <Button
            color="red"
            onClick={() => {
              form.reset();
            }}
            disabled={updateId != undefined}
          >
            Clear
          </Button>
        </>
      );
    }
    return <></>;
  }

  return (
    <SimpleGrid cols={2}>
      <Stack>
        {editing ? (
          <>
            <ImageDropZone
              files={form.getValues()['image']}
              setFiles={setImage}
            />
            <ItemList
              title="Instructions"
              edit={true}
              form={form}
              listType="instructions"
            />
          </>
        ) : (
          <>
            {!props.editing && (
              <>
                <RecipeImage imgSrc={props.recipe.imgSrc} />
                <ItemList
                  title="Instructions"
                  edit={false}
                  items={props.recipe.instructions}
                  listType="instructions"
                />
              </>
            )}
          </>
        )}
      </Stack>
      <Stack>
        {editing ? (
          <>
            <TextInput
              label="Title"
              {...form.getInputProps('title')}
              styles={{
                input: {
                  height: '10vh',
                  fontSize: '1.5rem',
                },
              }}
            />
            <ItemList
              title="Ingredients"
              edit={true}
              form={form}
              listType="ingredients"
            />
          </>
        ) : (
          <>
            {!props.editing && (
              <>
                <Title order={3}>{props.recipe.title}</Title>
                <ItemList
                  listType="ingredients"
                  title="Ingredients"
                  edit={props.editing}
                  items={form
                    .getValues()
                    .ingredients.map((ingredient) => ingredient.value)}
                />
              </>
            )}
          </>
        )}
      </Stack>
      <FormButtons />
    </SimpleGrid>
  );
}
