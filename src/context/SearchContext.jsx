import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const today = new Date();
today.setDate(today.getDate() + 1);

export const defaultSearchCriteria = {
  origin: 'Pune',
  destination: 'Solapur',
  travelDate: today.toISOString().split('T')[0],
  passengers: 1,
};

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [criteria, setCriteria] = useState(defaultSearchCriteria);
  const [resultMeta, setResultMeta] = useState({ total: 0, priceRange: { min: 0, max: 0 } });

  const updateCriteria = useCallback(
    updates => setCriteria(prev => ({ ...prev, ...updates })),
    []
  );

  const updateMeta = useCallback(meta => setResultMeta(meta), []);

  const value = useMemo(() => ({
    criteria,
    updateCriteria,
    resultMeta,
    updateMeta,
  }), [criteria, resultMeta, updateCriteria, updateMeta]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider');
  }
  return context;
};
