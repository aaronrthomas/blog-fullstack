import { useState, useEffect, useRef } from 'react';

interface Post {
  id: string;
  title: string;
  description: string;
}

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }

    if (!API_URL) {
      setSearchError("API URL is not configured");
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    
    try {
      try {
        const checkResponse = await fetch(
          API_URL,
          { method: 'HEAD' }
        );
        
        if (!checkResponse.ok) {
          throw new Error(`API is currently unavailable (status: ${checkResponse.status})`);
        }
      } catch (checkError) {
        console.warn('API availability check failed:', checkError);
      }
      
      const response = await fetch(
        `${API_URL}?search=${encodeURIComponent(query)}`
      );
      
      if (response.status === 404) {
        console.warn('Search API endpoint not found (404)');
        setSearchResults([]);
        setSearchError("Search service is currently unavailable. Please try again later.");
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }
      
      setSearchResults(data);
      
      if (data.length === 0) {
        console.log('Search returned no results for query:', query);
      }
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setSearchError("Network error: Please check your internet connection");
      } else {
        setSearchError(error instanceof Error ? error.message : 'Failed to fetch search results');
      }
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    showResults,
    setShowResults,
    searchError,
    searchRef
  };
}