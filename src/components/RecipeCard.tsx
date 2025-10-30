import { Card, Text, Group, Skeleton } from '@mantine/core';
import useQueryRecipe from '../hooks/useQueryRecipe';
import RecipeImage from './RecipeImage';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  id: string;
}

export default function RecipeCard({ id }: RecipeCardProps) {
  const { data, status } = useQueryRecipe(id);

  const navigate = useNavigate();

  const toRecipe = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <>
      {status != 'success' ? (
        <>
          <Skeleton height={200} mt={6} radius="xl" />
        </>
      ) : (
        <>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            onClick={() => {
              toRecipe(id);
            }}
            style={{
              cursor: 'pointer',
              transition: '0.15s ease',
            }}
          >
            <Card.Section>
              <RecipeImage imgSrc={data.imgSrc} />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{data.title}</Text>
            </Group>
            {data.description && (
              <Text size="sm" c="dimmed">
                {data.description}
              </Text>
            )}
          </Card>
        </>
      )}
    </>
  );
}
