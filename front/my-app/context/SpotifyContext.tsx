import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface SpotifyContextType {
  token: string | null;
  setSpotifyToken: (newToken: string) => void;
}

// Create context with proper default value
const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

// Custom hook for consuming the context
export const useSpotify = (): SpotifyContextType => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};

// Define props type for Provider
interface SpotifyProviderProps {
  children: ReactNode;
}

// Context Provider
export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const setSpotifyToken = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <SpotifyContext.Provider value={{ token, setSpotifyToken }}>
      {children}
    </SpotifyContext.Provider>
  );
};
