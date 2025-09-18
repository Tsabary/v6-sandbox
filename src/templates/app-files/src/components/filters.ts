export const ComponentsFiltersJsx = `import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

function Filters({
  sortBy,
  setSortBy,
  timeFrame,
  setTimeFrame,
  content,
  setContent,
}) {
  const [localSearch, setLocalSearch] = useState(content);

  // Handle search input change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setContent(localSearch);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [localSearch, setContent]);

  return (
    <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-2">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative max-w-xs flex-1">
            <Search
              size={12}
              className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400"
            />
            <input
              type="text"
              placeholder="Filter posts..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white py-1 pr-2 pl-6 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium whitespace-nowrap text-gray-600">
            Sort:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="min-w-0 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none"
          >
            <option value="new">New</option>
            <option value="hot">Hot</option>
            <option value="top">Top</option>
            <option value="controversial">Controversial</option>
          </select>
        </div>

        {sortBy !== 'new' && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium whitespace-nowrap text-gray-600">
              Time:
            </label>
            <select
              value={timeFrame || ''}
              onChange={(e) => setTimeFrame(e.target.value || null)}
              className="min-w-0 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none"
            >
              <option value="">All Time</option>
              <option value="hour">1h</option>
              <option value="day">1d</option>
              <option value="week">1w</option>
              <option value="month">1m</option>
              <option value="year">1y</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filters;
`;
