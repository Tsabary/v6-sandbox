export const ComponentsAuthAuthModalJsx = `import { useState } from 'react';
import { X, Shuffle } from 'lucide-react';
import { useAuth } from '../../context/use-auth';

export default function UsernameModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { setUsername: saveUsername, generateRandomUsername } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (username.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError(
        'Username can only contain letters, numbers, hyphens, and underscores',
      );
      return;
    }

    saveUsername(username.trim());
    onClose();
  };

  const handleGenerateRandom = () => {
    const randomUsername = generateRandomUsername();
    setUsername(randomUsername);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h1 className="text-lg font-semibold text-gray-900">
            Choose a Username
          </h1>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-sm text-blue-800">
              <strong>Demo Mode:</strong> This is a demo project, so we're
              keeping it simple! In a real application, you'd typically have
              proper user authentication. Enter a username below or shuffle
              through random suggestions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleGenerateRandom}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm whitespace-nowrap transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  title="Generate a random username suggestion"
                >
                  <Shuffle size={16} className="mr-1 inline" />
                  Shuffle
                </button>
              </div>
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={!username.trim() || username.length < 3}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Continue with this username
            </button>
          </form>

          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="mb-2 text-xs text-gray-600">
              <strong>Good to know:</strong>
            </p>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>
                • You can reuse a username you've used before if you want to
                test interactivity between different users
              </li>
              <li>
                • In this demo anyone can access any "account" by using the same
                username (e.g., "test", "user", "demo"). If you use a common
                word/phrase, you might enter an account with history
              </li>
              <li>
                • This is a public demo - don't post anything sensitive or
                important
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
`;
