import { ScrollArea, SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import useQueryParseRecipe from '../hooks/useQueryParseRecipe';
import { useForm } from '@mantine/form';
import CardList from './CardList';
import { useEffect, useState } from 'react';
import LoadedRecipe from './FullRecipe/LoadedRecipe';

export default function ParsedRecipe({ url }: { url: string }) {
  type ItemType = 'ingredients' | 'instructions';
  // interface setItemDetails {
  //   setItem: number;
  //   dataIndexToFormIndex: Record<number, number>; //Map of index in data to entry in form
  // }
  // const noSetItems = {
  //   setItem: -1,
  //   dataIndexToFormIndex: {},
  // };
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
      dataToFormIndexIngredients: {},
      dataToFormIndexInstructions: {},
    },
    //TODO: Need to add validate
  });

  useEffect(() => {
    console.log(form.getValues()['dataToFormIndexInstructions']);
  }, [form.getValues()['dataToFormIndexInstructions']]);

  //TODO: Iron out bug here
  function unsetItems(itemType: ItemType) {
    if (!data) {
      //Will only be called if there's data anyway
      return;
    }
    const dataIndexToFormIndex =
      itemType == 'ingredients'
        ? form.getValues()['dataToFormIndexInstructions']
        : form.getValues()['dataToFormIndexInstructions'];
    if (itemType == 'ingredients') {
      updateSetIngredients(noSetItems);
    } else {
      updateSetInstructions(noSetItems);
    }
    const relevantList = form.getValues()[itemType];
    const toRemoveIndexes = new Set(Object.values(dataIndexToFormIndex));
    const updatedList = relevantList.filter(
      (_, index) => !toRemoveIndexes.has(index),
    );
    console.log(updatedList);
    form.setFieldValue(itemType, updatedList);
    //Clear out maps
    if (itemType == 'ingredients') {
      form.setFieldValue('dataToFormIndexInstructions', {});
    } else {
      form.setFieldValue('dataToFormIndexInstructions', {});
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
    console.log(relevantList);
    const toAddItems =
      itemType === 'ingredients'
        ? data.ingredients[index]
        : data.instructions[index];
    const dataIndexToFormIndex: Record<number, number> = {};
    for (let i = 0; i < toAddItems.length; i++) {
      let formIndex = relevantList.length + i;
      dataIndexToFormIndex[i] = formIndex;
    }
    //Update state
    if (itemType == 'ingredients') {
      updateSetIngredients(index);
      form.setFieldValue('dataToFormIndexInstructions', dataIndexToFormIndex);
    } else {
      updateSetInstructions(index);
      form.setFieldValue('dataToFormIndexInstructions', dataIndexToFormIndex);
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
                    listItems={possibleInstructions}
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
                    listItems={possibleIngredients}
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
