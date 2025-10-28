import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setSelectedDepartment, setArtistOrCulture } from '@/store/slices/artworkSlice';
import { X, Filter } from 'lucide-react';
import { loadDepartments } from '@/store/slices/artworkSlice';
import { useEffect } from 'react';

export const Filters = () => {
  const dispatch = useAppDispatch();
  const { departments, selectedDepartment, artistOrCulture } = useAppSelector(
    state => state.artwork
  );

  useEffect(() => {
    dispatch(loadDepartments());
  }, [dispatch]);

  const handleDepartmentChange = (departmentId: number | null) => {
    dispatch(setSelectedDepartment(departmentId));
  };

  const handleArtistOrCultureToggle = () => {
    dispatch(setArtistOrCulture(!artistOrCulture));
  };

  return (
    <div className="space-y-4">
        <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 dark:text-gray-100" />
        <h3 className="font-semibold dark:text-gray-100">Filtros</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={artistOrCulture ? 'default' : 'outline'}
          size="sm"
          onClick={handleArtistOrCultureToggle}
        >
          Artista/Cultura
        </Button>
        
        <Button
          variant={selectedDepartment === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleDepartmentChange(null)}
        >
          Todos os Departamentos
        </Button>

        {departments.slice(0, 10).map((dept) => (
          <Button
            key={dept.departmentId}
            variant={selectedDepartment === dept.departmentId ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleDepartmentChange(dept.departmentId)}
          >
            {dept.displayName}
          </Button>
        ))}
      </div>

      {(selectedDepartment !== null || artistOrCulture) && (
        <div className="flex items-center gap-2">
          <Badge>Ativos: </Badge>
          {artistOrCulture && (
            <Badge variant="secondary" className="gap-1">
              Artista/Cultura
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={handleArtistOrCultureToggle}
              />
            </Badge>
          )}
          {selectedDepartment !== null && (
            <Badge variant="secondary" className="gap-1">
              {departments.find(d => d.departmentId === selectedDepartment)?.displayName}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleDepartmentChange(null)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

