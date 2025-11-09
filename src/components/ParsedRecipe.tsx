import { ScrollArea, SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import useQueryParseRecipe from '../hooks/useQueryParseRecipe';
import { useForm } from '@mantine/form';
import CardList from './CardList';
import { useState } from 'react';
import LoadedRecipe from './FullRecipe/LoadedRecipe';

export default function ParsedRecipe({ url }: { url: string }) {
  type ItemType = 'ingredients' | 'instructions';
  const noSetItems = -1;
  const { data, status } = useQueryParseRecipe(url);
  const [setInstructions, updateSetInstructions] = useState<number>(noSetItems);
  const [setIngredients, updateSetIngredients] = useState<number>(noSetItems);

  const form = useForm<RecipeFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      ingredients: [],
      instructions: [],
      image: [],
    },
    //TODO: Need to add validate
  });

  //TODO: Iron out bug here
  function unsetItems(itemType: ItemType) {
    if (!data) {
      //Will only be called if there's data anyway
      return;
    }
    let setList: KeyEntry<string>[];
    if (itemType == 'ingredients') {
      if (setIngredients == -1) {
        return; //Nothing to do
      }
      setList = data.ingredients[setIngredients];
      updateSetIngredients(noSetItems);
    } else {
      if (setInstructions == -1) {
        return; //Nothing to do
      }
      setList = data.instructions[setInstructions];
      updateSetInstructions(noSetItems);
    }
    for (const entry of setList) {
      const index = form
        .getValues()
        [itemType].findIndex((e) => e.key === entry.key);
      form.removeListItem(itemType, index);
    }
  }

  /**
   * Set one of the
   * @param index index of item in data list
   * @param itemType ingredients or instructions list
   */
  function setitems(index: number, itemType: ItemType) {
    if (!data) {
      //Will only be called if there's data anyway
      return;
    }
    //Unset any items
    unsetItems(itemType);
    // Get relevant entry
    const relevantList = form.getValues()[itemType];
    let toAddItems: KeyEntry<string>[];
    if (itemType === 'ingredients') {
      toAddItems = data.ingredients[index];
      updateSetIngredients(index);
    } else {
      toAddItems = data.instructions[index];
      updateSetInstructions(index);
    }
    //Update form
    form.setFieldValue(itemType, [...relevantList, ...toAddItems]);
  }

  return (
    <SimpleGrid cols={2}>
      <Stack>
        <Title order={4}>Possible Instructions:</Title>
        <ScrollArea
          w="50vw"
          h="30vh"
          type="auto"
          scrollbarSize={6}
          offsetScrollbars
        >
          <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
            {status !== 'success'
              ? ['', '', ''].map((_, i) => (
                  <Skeleton key={i} height="28vh" width="20vw" radius="xl" />
                ))
              : data.instructions.map((possibleInstructions, i) => (
                  <CardList
                    listItems={possibleInstructions.map((val) => val.value)}
                    key={i}
                    index={i}
                    setItem={setInstructions}
                    unsetItems={() => unsetItems('instructions')}
                    setItems={() => setitems(i, 'instructions')}
                  />
                ))}
          </div>
        </ScrollArea>
        <Title order={4}>Possible Ingredients:</Title>
        <ScrollArea
          w="50vw"
          h="30vh"
          type="auto"
          scrollbarSize={6}
          offsetScrollbars
        >
          <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
            {status !== 'success'
              ? ['', '', ''].map((_, i) => (
                  <Skeleton key={i} height="28vh" width="20vw" radius="xl" />
                ))
              : data.ingredients.map((possibleIngredients, i) => (
                  <CardList
                    listItems={possibleIngredients.map((val) => val.value)}
                    key={i}
                    index={i}
                    setItem={setIngredients}
                    unsetItems={() => unsetItems('ingredients')}
                    setItems={() => setitems(i, 'ingredients')}
                  />
                ))}
          </div>
        </ScrollArea>
      </Stack>
      {status !== 'success' ? (
        <SimpleGrid cols={2}>
          <Stack>
            <Skeleton height={'30vh'} width={'20vw'} mt={6} radius="xl" />
            <Skeleton height={'40vh'} width={'20vw'} mt={6} radius="xl" />
          </Stack>
          <Stack>
            <Skeleton height={'20vh'} width={'20vw'} mt={6} radius="xl" />
            <Skeleton height={'50vh'} width={'20vw'} mt={6} radius="xl" />
          </Stack>
        </SimpleGrid>
      ) : (
        <LoadedRecipe editing={true} form={form} />
      )}
    </SimpleGrid>
  );
}
