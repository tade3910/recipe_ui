import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  Button,
  Center,
  Group,
  Space,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import ParsedRecipe from '../components/ParsedRecipe';
const MyForm = () => {
  const [parsedUrl, SetParsdeUrl] = useState<string>('');

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      url: '',
    },
    validate: {
      url: (value) => {
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
        return urlRegex.test(value) ? null : 'Invalid URL';
      },
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (form.validateField('url').hasError) {
      return;
    }
    if (parsedUrl) {
      const proceed = window.confirm(
        'You have unsaved changes. Are you sure you want to continue?',
      );
      if (!proceed) return;
    }
    SetParsdeUrl(form.getValues()['url']);
    form.setFieldValue('url', '');
  };

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (parsedUrl) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [parsedUrl]);

  return (
    <>
      <Center>
        <Stack align="center">
          <Title order={2}>Parse New Recipe</Title>
          <form onSubmit={handleSubmit}>
            <Group>
              <TextInput
                {...form.getInputProps('url')}
                key={form.key('url')}
                placeholder="Enter recipe URL"
                w="50vw"
              />
              <Button type="submit" mt="md">
                Fetch
              </Button>
            </Group>
          </form>
          <Space h="md" />
        </Stack>
      </Center>
      {parsedUrl && <ParsedRecipe url={form.getValues()['url']} />}
    </>
  );
};

export default MyForm;
