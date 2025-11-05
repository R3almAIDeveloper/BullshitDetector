// src/contexts/UserModeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserMode = 'voter' | 'professional';

interface UserModeContextType {
  mode: UserMode;
  setMode: (mode: UserMode) => void;
}

const UserModeContext = createContext<UserModeContextType | undefined>(undefined);

export function UserModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<UserMode>('voter');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bullshit-detector-mode');
    if (saved === 'professional' || saved === 'voter') {
      setModeState(saved);
    }
  }, []);

  // Save to localStorage
  const setMode = (newMode: UserMode) => {
    setModeState(newMode);
    localStorage.setItem('bullshit-detector-mode', newMode);
  };

  return (
    <UserModeContext.Provider value={{ mode, setMode }}>
      {children}
    </UserModeContext.Provider>
  );
}

export const useUserMode = (): UserModeContextType => {
  const context = useContext(UserModeContext);
  if (!context) throw new Error('useUserMode must be used within UserModeProvider');
  return context;
};