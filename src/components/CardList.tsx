import { Button, Card, List, Stack, ThemeIcon } from '@mantine/core';
import { IconCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface CardListProps {
  index: number; //Index of this item in list of items
  listItems: string[]; //Items belonging to this list
  setItem: number; //Index of items that is currently set
  setItems: () => void; //Function to add items to parent list
  unsetItems: () => void; //Function to remove items from parent list
}

export default function CardList(props: CardListProps) {
  const [buttonType, setButtonType] = useState<'Set' | 'Unset'>('Set');

  useEffect(() => {
    if (props.setItem !== props.index) {
      setButtonType('Set');
    } else {
      setButtonType('Unset');
    }
  }, [props.setItem]);

  const addAllItems = () => {
    props.setItems();
    // setButtonType('Remove');
  };

  const removeAllItems = () => {
    props.unsetItems();
    // setButtonType('Set');
  };

  return (
    <Stack>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircle size={16} />
            </ThemeIcon>
          }
        >
          {props.listItems.map((listItem, i) => (
            <List.Item key={i}>{listItem}</List.Item>
          ))}
        </List>
      </Card>
      {buttonType == 'Set' ? (
        <Button onClick={addAllItems}>{buttonType}</Button>
      ) : (
        <Button color="red" onClick={removeAllItems}>
          {buttonType}
        </Button>
      )}
    </Stack>
  );
}
