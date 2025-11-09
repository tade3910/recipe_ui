import { SimpleGrid, Skeleton } from '@mantine/core';

export default function LoadingRecipes() {
  return (
    <SimpleGrid cols={3}>
      {['', '', '', '', '', ''].map((_, index) => (
        <Skeleton key={index} height={500} mt={6} radius="xl" />
      ))}
    </SimpleGrid>
  );
}
