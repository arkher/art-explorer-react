import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleFavorite } from '@/store/slices/favoriteSlice';
import type { Artwork } from '@/domain/entities/Artwork';

interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorite.favorites);
  const isFavorite = favorites.some(f => f.objectID === artwork.objectID);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(artwork));
  };

  const handleExternalLink = () => {
    if (artwork.objectURL) {
      window.open(artwork.objectURL, '_blank');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group flex flex-col h-[600px]" >
        <div className="relative w-full h-[350px] overflow-hidden bg-gray-100 dark:bg-gray-800">
          {artwork.primaryImage ? (
            <img
              src={artwork.primaryImage}
              alt={artwork.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
              Imagem não disponível
            </div>
          )}
          
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900"
            onClick={handleFavoriteToggle}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>
        </div>

        <CardContent className="p-4 space-y-2 flex-1 flex flex-col overflow-hidden">
          <h3 className="font-semibold text-lg line-clamp-2 dark:text-gray-100">{artwork.title}</h3>
          
          {artwork.artistDisplayName && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{artwork.artistDisplayName}</p>
          )}
          
          {artwork.objectDate && (
            <p className="text-sm text-gray-600 dark:text-gray-400">{artwork.objectDate}</p>
          )}
          
          <div className="flex flex-wrap gap-1">
            {artwork.department && (
              <Badge variant="secondary" className="text-xs">{artwork.department}</Badge>
            )}
            {artwork.medium && (
              <Badge variant="outline" className="text-xs line-clamp-1">{artwork.medium}</Badge>
            )}
          </div>

          {artwork.objectURL && (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-auto"
              onClick={handleExternalLink}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Met Museum
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

