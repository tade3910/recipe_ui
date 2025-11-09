import {
  Modal,
  Stack,
  Title,
  Text,
  Group,
  ActionIcon,
  TextInput,
} from '@mantine/core';
import { IconCheck, IconPencil } from '@tabler/icons-react';
import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';

interface UserModalProps {
  modalOpened: boolean;
  setModalOpened: (value: React.SetStateAction<boolean>) => void;
}

export default function UserModal({
  modalOpened,
  setModalOpened,
}: UserModalProps) {
  const [editName, setEditName] = useState<boolean>(false);

  const { user, updateUserName } = useAuth();

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="User Profile"
      >
        <Stack>
          <Title order={3}>Name</Title>
          <Group>
            {editName ? (
              <>
                <TextInput
                  value={user!.name}
                  onChange={(e) => updateUserName(e.currentTarget.value)}
                />
                <ActionIcon onClick={() => setEditName(false)}>
                  <IconCheck />
                </ActionIcon>
              </>
            ) : (
              <>
                <Text size="md">{user!.name}</Text>
                <ActionIcon
                  onClick={() => setEditName(true)}
                  disabled={status !== 'success'}
                >
                  <IconPencil />
                </ActionIcon>
              </>
            )}
          </Group>
          <Title order={3}>Email</Title>
          <Text size="md">{user!.email}</Text>
        </Stack>
      </Modal>
    </>
  );
}
