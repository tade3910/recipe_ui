import {
  ActionIcon,
  Checkbox,
  Grid,
  Group,
  List,
  Stack,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconCircleDashed, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import type { UseFormReturnType } from '@mantine/form';
import SortableInputList from './SortableInputList';
import { randomId } from '@mantine/hooks';

interface ItemListProps {
  title: string;
  listType: 'ingredients' | 'instructions';
}

interface EditableItemListProps extends ItemListProps {
  edit: true;
  form: UseFormReturnType<
    RecipeFormValues,
    (values: RecipeFormValues) => RecipeFormValues
  >;
}

interface UneditableItemListProps extends ItemListProps {
  items: string[];
  edit: false;
}

//TODO:Add logic to help update state for set map

/**
 * Component of list that when can be edited
 */
export default function ItemList(
  props: EditableItemListProps | UneditableItemListProps,
) {
  const [addedItem, setAddedItem] = useState<string>('');

  function addItem() {
    if (props.edit) {
      const form = props.form;
      form.insertListItem(props.listType, {
        value: addedItem,
        key: randomId(),
      });
      setAddedItem('');
    }
  }

  function deleteItem(index: number) {
    if (props.edit) {
      const form = props.form;
      form.removeListItem(props.listType, index);
    }
  }

  return (
    <Stack>
      <Title order={6}>{props.title}</Title>
      {props.edit ? (
        <Stack>
          <>
            {props.listType === 'instructions' ? (
              <SortableInputList form={props.form} deleteItem={deleteItem} />
            ) : (
              <>
                {props.form.getValues()[props.listType].map((val, index) => (
                  <Grid key={`${val}_${index}`}>
                    <Grid.Col span={10}>
                      <TextInput
                        {...props.form.getInputProps(
                          `${props.listType}.${index}.value`,
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <ActionIcon variant="filled" aria-label="Delete item">
                        <IconTrash
                          style={{ width: '70%', height: '70%' }}
                          stroke={1.5}
                          onClick={() => deleteItem(index)}
                        />
                      </ActionIcon>
                    </Grid.Col>
                  </Grid>
                ))}
              </>
            )}
          </>

          <Group>
            <TextInput
              value={addedItem}
              onChange={(event) => setAddedItem(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  addItem();
                }
              }}
            />
            <ActionIcon
              variant="filled"
              aria-label="Add item"
              onClick={addItem}
            >
              <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Stack>
      ) : (
        <>
          {props.listType == 'ingredients' ? (
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <IconCircleDashed size={16} />
                </ThemeIcon>
              }
            >
              {props.items.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          ) : (
            <Stack>
              {props.items.map((item, index) => (
                <Checkbox label={item} key={index} />
              ))}
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
}
