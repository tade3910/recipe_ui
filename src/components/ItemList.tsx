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
import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import type { UseFormReturnType } from '@mantine/form';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
      form.insertListItem(props.listType, addedItem);
      setAddedItem('');
    }
  }

  function deleteItem(index: number) {
    if (props.edit) {
      const form = props.form;
      form.removeListItem(props.listType, index);
    }
  }

  interface SortableItemProps {
    id: string;
    children: React.ReactNode;
  }

  function SortableItem({ id, children }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  }

  function DraggableTextInputList() {
    if (!props.edit) {
      return <>We fr shouldn't be here</>;
    }

    const sensors = useSensors(useSensor(PointerSensor));
    const form = props.form;
    const [items, setItems] = useState(form.getValues()['instructions']);

    // Sync with form when it changes
    useEffect(() => {
      setItems(form.getValues()['instructions']);
    }, [form.getValues()['instructions']]);

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) return;
      const oldIndex = items.findIndex(
        (_, i) => `${'instructions'}.${i}` === active.id,
      );
      const newIndex = items.findIndex(
        (_, i) => `${'instructions'}.${i}` === over.id,
      );
      const newItems = arrayMove(items, oldIndex, newIndex);
      // oldFormIndex -> dataIndex of new Index

      setItems(newItems); // update local state
      form.setFieldValue('instructions', newItems); // update form
      updateIndexMap(oldIndex, newIndex);
    };

    const updateIndexMap = (oldIndex: number, newIndex: number) => {
      //deep copy map
      const dataIndexToFormIndex: Record<number, number> = {};
      let oldDataIndex: number = -1;
      let newDataIndex: number = -1;
      for (const [dataIndex, formIndex] of Object.entries(
        form.getValues()['dataToFormIndexInstructions'],
      )) {
        const numberDataIndex = Number.parseInt(dataIndex);
        dataIndexToFormIndex[numberDataIndex] = formIndex;
        if (formIndex == oldIndex) {
          oldDataIndex = numberDataIndex;
        } else if (formIndex == newIndex) {
          newDataIndex = numberDataIndex;
        }
      }
      if (oldDataIndex < 0) {
        //Moving item outside of map
        if (newDataIndex >= 0) {
          //Swapping with item in map
          for (const dataIndex in Object.keys(dataIndexToFormIndex)) {
            const numDataIndex = Number.parseInt(dataIndex);
            const formIndex = dataIndexToFormIndex[numDataIndex];
            if (formIndex < oldIndex && formIndex >= newIndex) {
              //Current Item was before or at new item but is now after it
              //Push down one
              dataIndexToFormIndex[numDataIndex]++;
            } else if (formIndex > oldIndex && formIndex <= newIndex) {
              //Current Item was after or at new item but now before it
              //Push up one
              dataIndexToFormIndex[numDataIndex]--;
            }
          }
        }
      } else if (oldDataIndex >= 0) {
        //Moving item that was in map
        for (const dataIndex in Object.keys(dataIndexToFormIndex)) {
          const numDataIndex = Number.parseInt(dataIndex);
          const formIndex = dataIndexToFormIndex[numDataIndex];
          if (formIndex > oldIndex && formIndex <= newIndex) {
            //Moved Item was before or at current item but is now after it
            //Push current item up one
            dataIndexToFormIndex[numDataIndex]--;
          } else if (formIndex < oldIndex && formIndex >= newIndex) {
            //Moved Item was after or at item but now before it
            //Push down one
            dataIndexToFormIndex[numDataIndex]++;
          }
        }
        dataIndexToFormIndex[oldDataIndex] = newIndex; //Set moved item to new position
      }

      form.setFieldValue('dataToFormIndexInstructions', dataIndexToFormIndex);
    };

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(
            (_: any, index: number) => `${'instructions'}.${index}`,
          )}
          strategy={verticalListSortingStrategy}
        >
          {items.map((_: any, index: number) => (
            <SortableItem
              key={`${'instructions'}.${index}`}
              id={`${'instructions'}.${index}`}
            >
              <Grid>
                <Grid.Col span={10}>
                  <TextInput
                    {...form.getInputProps(`${'instructions'}.${index}`)}
                  />
                </Grid.Col>
                <Grid.Col span={1}>
                  <ActionIcon
                    variant="filled"
                    aria-label="Delete item"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent drag-kit from intercepting
                      console.log(index);
                      deleteItem(index);
                    }}
                    onPointerDown={(e) => e.stopPropagation()} // also prevents dnd-kit drag start
                  >
                    <IconTrash
                      style={{ width: '70%', height: '70%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    );
  }

  return (
    <Stack>
      <Title order={6}>{props.title}</Title>
      {props.edit ? (
        <Stack>
          <>
            {props.listType === 'instructions' ? (
              <DraggableTextInputList />
            ) : (
              <>
                {props.form.getValues()[props.listType].map((val, index) => (
                  <Grid key={`${val}_${index}`}>
                    <Grid.Col span={10}>
                      <TextInput
                        {...props.form.getInputProps(
                          `${props.listType}.${index}`,
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
