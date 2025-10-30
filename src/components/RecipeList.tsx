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
import { useState, type Dispatch, type SetStateAction } from 'react';
import { IconPlus } from '@tabler/icons-react';

interface RecipeListProps {
  items: string[];
  title: string;
  setItems: Dispatch<SetStateAction<string[]>>;
  listType: 'view' | 'check' | 'edit';
}

export default function RecipeList({
  items,
  setItems,
  title,
  listType,
}: RecipeListProps) {
  const [addedItem, setAddedItem] = useState<string>('');

  //Adds item to list of items
  const addItem = () => {
    setItems((prev) => [...prev, addedItem]);
    setAddedItem('');
  };

  return (
    <Stack>
      <Title order={6}>{title}</Title>
      {listType == 'view' ? (
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
          {items.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
          ))}
        </List>
      ) : (
        <>
          {listType == 'check' ? (
            <Stack>
              {items.map((item, index) => (
                <Checkbox label={item} key={index} />
              ))}
            </Stack>
          ) : (
            <Stack>
              {items.map((item, index) => (
                <EditableItem
                  itemIndex={index}
                  key={index}
                  setItems={setItems}
                  editedItem={item}
                />
              ))}
              <Group>
                <TextInput
                  value={addedItem}
                  onChange={(event) => setAddedItem(event.currentTarget.value)}
                />
                <ActionIcon variant="filled" aria-label="Add item">
                  <IconPlus
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                    onClick={addItem}
                  />
                </ActionIcon>
              </Group>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
}

interface EditableItemProps {
  itemIndex: number;
  setItems: Dispatch<SetStateAction<string[]>>;
  editedItem: string;
}

function EditableItem({ itemIndex, setItems, editedItem }: EditableItemProps) {
  //Edits items from list of items
  const editItem = (value: string) => {
    setItems((prev) => prev.map((item, i) => (i === itemIndex ? value : item)));
  };

  //Deletes items from list of items
  const deleteItem = () => {
    setItems((prev) => prev.filter((_, i) => i !== itemIndex));
  };

  return (
    <Grid>
      <Grid.Col span={10}>
        <TextInput
          value={editedItem}
          onChange={(event) => editItem(event.currentTarget.value)}
        />
      </Grid.Col>
      <Grid.Col span={1}>
        <ActionIcon variant="filled" aria-label="Delete item">
          <IconTrash
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
            onClick={deleteItem}
          />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
}
