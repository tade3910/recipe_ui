import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from 'react';

interface AuthContextType {
  isAuthenticated: () => boolean;
  user: User | undefined;
  login: (token: string) => void;
  logout: () => void;
  updateUserName: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const tokenName = 'RecipeAppToken';

const defaultUser: User = {
  email: 'omotadeogunmodede@gmail.com',
  exp: Date.now() / 1000 + 6000,
  name: 'Omotade Ogunmodede',
  token: tokenName,
  userid: 'DefaultUser',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('RecipeAppToken'),
  );
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!!token) {
      try {
        setUser(defaultUser);
      } catch {}
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('RecipeAppToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('RecipeAppToken');
    setToken(null);
  };

  const isAuthenticated = () => {
    // Add logic for time
    if (user && !!token) {
      return true;
    }
    return false;
  };

  const updateUserName = (username: string) => {
    setUser((prev) => (prev ? { ...prev, name: username } : prev));
  };

  // sync token with storage changes in other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('RecipeAppToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, updateUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Hhook to access auth info anywhere
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider: ');
  }
  return context;
};
