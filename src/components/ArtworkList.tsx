import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtworkCard } from './ArtworkCard';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { searchArtworks, loadMoreArtworks } from '@/store/slices/artworkSlice';
import { Loader2 } from 'lucide-react';

export const ArtworkList = () => {
  const dispatch = useAppDispatch();
  const { artworks, loading, hasMore, searchQuery, selectedDepartment, artistOrCulture } =
    useAppSelector(state => state.artwork);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial load
    dispatch(searchArtworks({ 
      query: searchQuery || 'painting',
      departmentId: selectedDepartment || undefined,
      artistOrCulture 
    }));
  }, [dispatch, searchQuery, selectedDepartment, artistOrCulture]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          dispatch(loadMoreArtworks());
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, dispatch]);

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {artworks.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">Nenhuma obra encontrada</p>
          </motion.div>
        )}

        {artworks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.objectID} artwork={artwork} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      <div ref={observerTarget} className="h-4" />
    </div>
  );
};

