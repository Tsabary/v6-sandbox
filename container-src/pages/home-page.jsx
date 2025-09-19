import { useEffect, useState } from 'react';
import { EntityProvider, useEntityList, useUser } from '@replyke/react-js';
import Tweet from '../components/tweet';
import TweetComposer from '../components/tweet-composer';
import UserProfile from '../components/user-profile';
import UsernameModal from '../components/auth/auth-modal';
import LoadingPlaceholder from '../components/loading-placeholder';
import Filters from '../components/filters';
import { Sheet } from '../components/ui/sheet';
import CommentSectionSheet from '../components/comment-section-sheet';

export default function TweetFeed() {
  const {
    entities,
    fetchEntities,
    loading: loadingEntities,
    hasMore,
    loadMore,
  } = useEntityList({
    listId: 'home-tweets', // Filers at the store level
    sourceId: 'tweets', // Filters at the DB level
    limit: 10, // Batch size
  });
  const { user } = useUser();

  const [selectedEntity, setSelectedEntity] = useState(null);
  const [commentSheetOpen, setCommentSheetOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [content, setContent] = useState('');
  const [sortBy, setSortBy] = useState('new');
  const [timeFrame, setTimeFrame] = useState(null);

  useEffect(() => {
    const filters = { sortBy, timeFrame };

    if (content.length) {
      filters.contentFilters = { includes: [content] };
    }
    fetchEntities(filters, { resetUnspecified: true, clearImmediately: false });
  }, [sortBy, timeFrame, content]);

  function handleShowAuthModal() {
    setShowAuthModal(true);
  }

  function handleSelectEntity(ent) {
    setSelectedEntity(ent);
    setCommentSheetOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sheet>
        <CommentSectionSheet
          entity={selectedEntity}
          open={commentSheetOpen}
          onOpenChange={setCommentSheetOpen}
        />
        <div className="mx-auto max-w-2xl border-x border-gray-200 bg-white shadow-sm">
          {user && (
            <div className="bg-white p-4">
              <UserProfile />
            </div>
          )}
          <TweetComposer onAuthRequired={handleShowAuthModal} />

          <Filters
            sortBy={sortBy}
            setSortBy={setSortBy}
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
            content={content}
            setContent={setContent}
          />

          <div className="divide-y divide-gray-100">
            {entities.map((entity) => (
              <EntityProvider entity={entity} key={entity.id}>
                <Tweet
                  onAuthRequired={handleShowAuthModal}
                  handleSelectEntity={handleSelectEntity}
                />
              </EntityProvider>
            ))}
          </div>

          {loadingEntities && <LoadingPlaceholder />}

          {hasMore ? (
            <div className="flex items-center justify-center border-t border-gray-100 bg-white p-6">
              <button
                onClick={loadMore}
                disabled={loadingEntities}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {loadingEntities ? 'Loading...' : 'Load more'}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center border-t border-gray-100 bg-white p-6">
              <span className="text-sm text-gray-500">No more entities</span>
            </div>
          )}
        </div>
        <UsernameModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </Sheet>
    </div>
  );
}
