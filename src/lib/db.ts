// src/lib/db.ts
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DB_PATH = join(import.meta.env.DEV ? './' : './', 'bullshit-detector-db.json');

interface DB {
  apiKey: string;
  model: 'grok-3' | 'grok-4';
}

const DEFAULT_DB: DB = {
  apiKey: '',
  model: 'grok-3',
};

async function readDB(): Promise<DB> {
  try {
    const data = await readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid → return default
    return { ...DEFAULT_DB };
  }
}

async function writeDB(data: DB): Promise<void> {
  try {
    await writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write DB:', error);
  }
}

export const db = {
  async get(): Promise<DB> {
    return await readDB();
  },

  async setApiKey(key: string): Promise<void> {
    const current = await readDB();
    await writeDB({ ...current, apiKey: key.trim() });
  },

  async setModel(model: 'grok-3' | 'grok-4'): Promise<void> {
    const current = await readDB();
    await writeDB({ ...current, model });
  },
};