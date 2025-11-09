import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './Context/AuthContext.tsx';

import HomePage from './pages/HomePage.tsx';
import RecipePage from './pages/RecipePage.tsx';
import AddRecipePage from './pages/AddRecipePage.tsx';
import Header from './components/Header.tsx';
import BookmarkPage from './pages/BookmarkPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import LoginPage from './pages/LoginPage.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppShell>
          <AppShell.Header>
            <Header />
          </AppShell.Header>
          <AppShell.Main pt="80">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recipe/:id"
                element={
                  <ProtectedRoute>
                    <RecipePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addRecipe"
                element={
                  <ProtectedRoute>
                    <AddRecipePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <BookmarkPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
