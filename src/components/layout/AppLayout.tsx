// src/components/layout/AppLayout.tsx (new or replacement)
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Optional: useLocation here if needed

interface Props {
  children: ReactNode;
  currentPath: string;  // Passed from AppContent
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Analyzer', path: '/analyzer' },
  { label: 'Sentiment', path: '/sentiment' },
  { label: 'History', path: '/history' },
  { label: 'Settings', path: '/settings' },
] as const;

export function AppLayout({ children, currentPath }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header/Nav */}
      <header className="border-b bg-card">
        <nav className="container mx-auto flex gap-4 p-4">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-2 rounded transition-colors ${
                currentPath === path
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
              aria-current={currentPath === path ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto p-4">{children}</main>

      {/* Footer */}
      <footer className="border-t py-2 text-center text-sm text-muted-foreground bg-muted/50">
        © {new Date().getFullYear()} Bullshit Detector. All rights reserved.
      </footer>
    </div>
  );
}