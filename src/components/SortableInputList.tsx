import { TextInput, Grid, ActionIcon } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

type Form = UseFormReturnType<
  RecipeFormValues,
  (values: RecipeFormValues) => RecipeFormValues
>;

interface SortableListProps {
  form: Form;
  deleteItem: (index: number) => void;
}

export default function SortableList({ form, deleteItem }: SortableListProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const items = form.getValues().instructions.map((item) => item.key);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const employees = form.getValues().instructions;
      const oldIndex = employees.findIndex((e) => e.key === active.id);
      const newIndex = employees.findIndex((e) => e.key === over.id);
      form.setFieldValue(
        'instructions',
        arrayMove(employees, oldIndex, newIndex),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id, index) => (
          <SortableItem key={id} id={id}>
            <Grid>
              <Grid.Col span={10}>
                <TextInput
                  {...form.getInputProps(`${'instructions'}.${index}.value`)}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <ActionIcon
                  variant="filled"
                  aria-label="Delete item"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent drag-kit from intercepting
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
