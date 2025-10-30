import { Grid, Skeleton, Stack } from '@mantine/core';

export default function LoadingRecipe() {
  return (
    <Grid>
      <Grid.Col>
        <Stack>
          <Skeleton height={50} circle mb="xl" width="90%" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={50} mt={6} radius="xl" />
        </Stack>
      </Grid.Col>
      <Grid.Col>
        <Stack>
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={50} mt={6} radius="xl" />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
