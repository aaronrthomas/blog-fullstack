import React from 'react';
import Link from 'next/link';

type Post = {
  id: string | number;
  title: string;
  description: string;
};

export type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Post[];
  isSearching: boolean;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  searchError: Error | string | null | undefined;
  searchRef: React.RefObject<HTMLDivElement | null>;
  onResultClick?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearching,
  showResults,
  setShowResults,
  searchError,
  searchRef,
  onResultClick
}) => (
  <div className="relative" ref={searchRef}>
    <div className="relative">
      <input
        type="text"
        placeholder="Search posts..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
      />
      <div className="absolute right-3 top-2.5">
        {isSearching ? (
          <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>
    </div>
    
    {/* Search Results */}
    {showResults && searchQuery.trim() !== '' && (
      <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
        {isSearching ? (
          <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
        ) : searchError ? (
          <div className="px-4 py-3 text-sm text-red-500">Not found</div>
        ) : searchResults.length > 0 ? (
          <ul>
            {searchResults.map((post) => (
              <li key={post.id} className="border-b border-gray-100 last:border-0">
                <Link 
                  href={`/posts/${post.id}`}
                  className="block px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setShowResults(false);
                    setSearchQuery('');
                    onResultClick?.();
                  }}
                >
                  <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
        )}
      </div>
    )}
  </div>
);

export default SearchBar;