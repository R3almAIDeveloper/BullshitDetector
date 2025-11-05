// src/lib/history.ts
export interface HistoryItem {
  id: string;
  claim: string;
  verdict: 'bullshit' | 'mostly true' | 'neutral';
  score: number;
  timestamp: number;
  mode: 'voter' | 'professional';
}

const STORAGE_KEY = 'validator-history';

export const saveToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>): HistoryItem => {
  const newItem: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };

  const existing = getHistory();
  const updated = [newItem, ...existing].slice(0, 100); // Keep last 100
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return newItem;
};

export const getHistory = (): HistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};