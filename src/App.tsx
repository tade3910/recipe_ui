import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';

import HomePage from './pages/HomePage.tsx';
import RecipePage from './pages/RecipePage.tsx';
import AddRecipePage from './pages/AddRecipePage.tsx';
import Header from './components/Header.tsx';
import BookmarkPage from './pages/BookmarkPage.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main pt="80">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/addRecipe" element={<AddRecipePage />} />
            <Route path="/bookmarks" element={<BookmarkPage />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </QueryClientProvider>
  );
}

export default App;
