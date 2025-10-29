import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setSearchQuery, searchArtworks } from '@/store/slices/artworkSlice';
import { useDebounce } from '@/hooks/useDebounce';
export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, selectedDepartment, artistOrCulture } = useAppSelector(
    state => state.artwork
  );
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const debouncedQuery = useDebounce(localQuery, 500);

  useEffect(() => {
    // Auto-search when user stops typing (after debounce)
    if (debouncedQuery !== searchQuery) {
      dispatch(setSearchQuery(debouncedQuery));
    }
  }, [debouncedQuery, dispatch, searchQuery]);

  useEffect(() => {
    if (localQuery.length > 0) {
      // Show cached suggestions
      const cachedSuggestions = localStorage.getItem('art-search-history');
      if (cachedSuggestions) {
        const history = JSON.parse(cachedSuggestions) as string[];
        setSuggestions(
          history.filter(s => s.toLowerCase().includes(localQuery.toLowerCase()))
        );
      }
    } else {
      setSuggestions([]);
    }
  }, [localQuery]);

  const handleSearch = useCallback((query: string, forceSearch = false) => {
    const trimmedQuery = query.trim();
    dispatch(setSearchQuery(trimmedQuery));
    
    // Se for uma busca forçada (clicou no botão), dispara a busca diretamente
    if (forceSearch) {
      const hasFilters = selectedDepartment !== null || artistOrCulture;
      const queryToUse = trimmedQuery || (hasFilters ? undefined : 'painting');
      
      dispatch(searchArtworks({
        query: queryToUse || undefined,
        departmentId: selectedDepartment !== null && selectedDepartment !== undefined ? selectedDepartment : undefined,
        artistOrCulture: artistOrCulture || false
      }));
    }
    
    // Save search history
    const history = localStorage.getItem('art-search-history');
    const searchHistory = history ? JSON.parse(history) : [];
    if (trimmedQuery && !searchHistory.includes(trimmedQuery)) {
      searchHistory.unshift(trimmedQuery);
      localStorage.setItem(
        'art-search-history',
        JSON.stringify(searchHistory.slice(0, 10))
      );
    }
  }, [dispatch, selectedDepartment, artistOrCulture]);

  return (
    <div className="w-full relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar obras por título, artista..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(localQuery, true); // força a busca quando Enter é pressionado
                setShowSuggestions(false);
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10 pr-8"
          />
          {localQuery && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => {
                setLocalQuery('');
                dispatch(setSearchQuery(''));
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Button onClick={() => handleSearch(localQuery, true)}>
          Buscar
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-10 max-h-60 overflow-y-auto dark:bg-slate-800">
          <div className="p-2 space-y-1">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setLocalQuery(suggestion);
                  handleSearch(suggestion, true); // força a busca ao clicar em sugestão
                  setShowSuggestions(false);
                }}
              >
                <Search className="mr-2 h-4 w-4" />
                {suggestion}
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

