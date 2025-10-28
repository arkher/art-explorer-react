import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtworkCard } from './ArtworkCard';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loadFavorites } from '@/store/slices/favoriteSlice';
import { Heart } from 'lucide-react';

export const FavoritesList = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorite.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 space-y-4"
      >
        <Heart className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Nenhuma obra favoritada</h2>
        <p className="text-muted-foreground text-center">
          Explore as obras e marque as suas favoritas
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">Favoritas</h1>
        <span className="text-sm text-muted-foreground">
          {favorites.length} {favorites.length === 1 ? 'obra' : 'obras'}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {favorites.map((favorite) => (
            <ArtworkCard key={favorite.objectID} artwork={favorite.artwork} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};


