import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModel } from '../contexts/ModelContext';   // Fixed
import { useUserMode } from '../contexts/UserModeContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { apiKey, setApiKey, model, setModel } = useModel();
  const { mode, setMode } = useUserMode();

  const [localKey, setLocalKey] = useState(apiKey || '');

  const handleSave = () => {
    setApiKey(localKey.trim());
    alert('Settings saved!');
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Configure your API key, model, and user mode.
      </p>

      <div className="space-y-8">
        {/* API Key */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">xAI API Key</h2>
          <input
            type="password"
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <p className="text-xs text-gray-500 mt-2">
            Get your key at{' '}
            <a
              href="https://x.ai/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              x.ai/api
            </a>
          </p>
        </div>

        {/* Model */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Model</h2>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="model"
                value="grok-3"
                checked={model === 'grok-3'}
                onChange={() => setModel('grok-3')}
                className="mr-2"
              />
              Grok 3 (Free tier)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="model"
                value="grok-4"
                checked={model === 'grok-4'}
                onChange={() => setModel('grok-4')}
                className="mr-2"
              />
              Grok 4 (Premium)
            </label>
          </div>
        </div>

        {/* User Mode */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">User Mode</h2>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="voter"
                checked={mode === 'voter'}
                onChange={() => setMode('voter')}
                className="mr-2"
              />
              Voter (Quick checks)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="mode"
                value="professional"
                checked={mode === 'professional'}
                onChange={() => setMode('professional')}
                className="mr-2"
              />
              Professional (Deep analysis)
            </label>
          </div>
        </div>

        {/* Save */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Save Settings
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}