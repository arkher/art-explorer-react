import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Heart, Menu, X } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { ArtworkList } from './components/ArtworkList';
import { FavoritesList } from './components/FavoritesList';
import { ThemeToggle } from './components/ThemeToggle';
import { Button } from './components/ui/Button';
type View = 'explore' | 'favorites';

export const App = () => {
  const [currentView, setCurrentView] = useState<View>('explore');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-slate-800">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 transition-colors">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Art Explorer
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-4">
            <Button
              variant={currentView === 'explore' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('explore')}
            >
              <Home className="mr-2 h-4 w-4" />
              Explorar
            </Button>
            <Button
              variant={currentView === 'favorites' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('favorites')}
            >
              <Heart className="mr-2 h-4 w-4" />
              Favoritas
            </Button>
          </nav>

          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                <Button
                  variant={currentView === 'explore' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentView('explore');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Explorar
                </Button>
                <Button
                  variant={currentView === 'favorites' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentView('favorites');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Favoritas
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <AnimatePresence mode="wait">
          {currentView === 'explore' ? (
            <motion.div
              key="explore"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <SearchBar />
              <Filters />
              <ArtworkList />
            </motion.div>
          ) : (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <FavoritesList />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
