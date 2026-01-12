import { createSearchParams, useNavigate } from 'react-router-dom';
import { useSearchContext } from '../context/SearchContext.jsx';

const useBookingNavigation = () => {
  const navigate = useNavigate();
  const { criteria, updateCriteria } = useSearchContext();

  return (overrides = {}) => {
    const nextCriteria = { ...criteria, ...overrides };
    updateCriteria(nextCriteria);

    navigate({
      pathname: '/s-to-d',
      search: createSearchParams({
        origin: nextCriteria.origin,
        destination: nextCriteria.destination,
        date: nextCriteria.travelDate,
      }).toString(),
    });
  };
};

export default useBookingNavigation;
