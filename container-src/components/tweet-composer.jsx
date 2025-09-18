import { useState } from 'react';
import { Send } from 'lucide-react';
import { useEntityList, useUser } from '@replyke/react-js';

export default function TweetComposer({ onAuthRequired }) {
  const { user } = useUser();
  const { createEntity } = useEntityList({
    listId: 'home-tweets',
    sourceId: 'tweets',
  });
  const [content, setContent] = useState('');
  const maxLength = 280;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      onAuthRequired();
      return;
    }
    if (content.trim().length > 0 && content.length <= maxLength) {
      createEntity({ content: content.trim() });
      setContent('');
    }
  };

  const handleTextareaClick = () => {
    if (!user) {
      onAuthRequired();
    }
  };

  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;
  const isDisabled = content.trim().length === 0 || isOverLimit;

  return (
    <div className="border-b border-gray-100 bg-white px-4 py-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={handleTextareaClick}
          placeholder={
            user ? "What's happening?" : 'Sign in to share your thoughts...'
          }
          className="min-h-[60px] w-full flex-1 resize-none border-none bg-transparent text-lg placeholder-gray-400 outline-none"
          rows={2}
          readOnly={!user}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={
                'text-xs font-medium ' +
                (isOverLimit
                  ? 'text-red-500'
                  : remainingChars <= 20
                    ? 'text-amber-500'
                    : 'text-gray-400')
              }
            >
              {remainingChars}
            </span>
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="flex cursor-pointer items-center space-x-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60"
          >
            <Send size={14} />
            <span>Tweet</span>
          </button>
        </div>
      </form>
    </div>
  );
}
