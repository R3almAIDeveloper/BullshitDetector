// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { ModelProvider } from './contexts/ModelContext';
import { UserModeProvider } from './contexts/UserModeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ModelProvider>
          <UserModeProvider>
            <AppRoutes />
          </UserModeProvider>
        </ModelProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}