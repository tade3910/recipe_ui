import { Button, Grid, Group, Input, Menu, Text } from '@mantine/core';
import {
  IconBookmarkFilled,
  IconLogout2,
  IconPlus,
  IconSaladFilled,
  IconSearch,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserModal from './UserModal';
import useQueryUser from '../hooks/useQueryUser';

export default function Header() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const { data, status } = useQueryUser('user_id');
  const navigate = useNavigate();

  const searchRecipes = () => {
    console.log(searchValue);
    setSearchValue('');
    navigate('/recipe/1');
  };

  return (
    <Grid p="sm">
      <Grid.Col span={4}>
        <Button
          leftSection={<IconSaladFilled size={14} />}
          onClick={() => navigate('/')}
        >
          Tade's Recipe app
        </Button>
      </Grid.Col>
      <Grid.Col span={4}>
        <Input
          placeholder="Search"
          leftSection={<IconSearch size={16} onClick={searchRecipes} />}
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchRecipes();
            }
          }}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Group justify="flex-end">
          <Button onClick={() => navigate('/addRecipe')}>
            <IconPlus />
          </Button>
          <Button onClick={() => navigate('/bookmarks')}>
            <IconBookmarkFilled />
          </Button>
          <Menu shadow="md" opened={menuOpened} onChange={setMenuOpened}>
            <Menu.Target>
              <Button>
                <IconUser />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUser size={14} />}>
                <Text
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalOpened(true);
                    setMenuOpened(false);
                  }}
                >
                  Profile
                </Text>
              </Menu.Item>
              <Menu.Item leftSection={<IconLogout2 size={14} />}>
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Grid.Col>
      <UserModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        userData={data}
        status={status}
      />
    </Grid>
  );
}
