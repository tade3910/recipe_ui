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
import { useEffect, useState } from 'react';
import type { QueryStatus } from 'react-query';

interface UserModalProps {
  modalOpened: boolean;
  setModalOpened: (value: React.SetStateAction<boolean>) => void;
  userData?: User;
  status: QueryStatus;
}

export default function UserModal({
  modalOpened,
  setModalOpened,
  userData,
  status,
}: UserModalProps) {
  const [editName, setEditName] = useState<boolean>(false);
  const loadingUser: User = {
    name: 'loading...',
    email: 'loading...',
    recipes: [],
  };
  const [user, setUser] = useState<User>(loadingUser);

  useEffect(() => {
    if (status == 'success') {
      setUser(userData!);
    } else {
      setUser(loadingUser);
    }
  }, [status]);

  const updateUserName = (username: string) => {
    setUser((prev) => ({
      ...prev,
      name: username,
    }));
  }

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
                  value={user.name}
                  onChange={(e) => updateUserName(e.currentTarget.value)}
                />
                <ActionIcon onClick={() => setEditName(false)}>
                  <IconCheck />
                </ActionIcon>
              </>
            ) : (
              <>
                <Text size="md">{user.name}</Text>
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
          <Text size="md">{user.email}</Text>
        </Stack>
      </Modal>
    </>
  );
}
