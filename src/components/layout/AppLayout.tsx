// src/components/layout/AppLayout.tsx
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  currentPath: string;
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Analyzer', path: '/analyzer' },
  { label: 'Sentiment', path: '/sentiment' },
  { label: 'History', path: '/history' },
  { label: 'Settings', path: '/settings' },
];

export function AppLayout({ children, currentPath }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header / Nav */}
      <header className="border-b">
        <nav className="container mx-auto flex gap-4 p-4">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-1 rounded transition ${
                currentPath === path ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
              aria-current={currentPath === path ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-4">{children}</main>

      {/* Footer (optional) */}
      <footer className="border-t py-2 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Bullshit Detector
      </footer>
    </div>
  );
}
