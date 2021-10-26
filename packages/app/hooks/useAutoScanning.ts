import { useEffect } from 'react';
import { fetchNearbyArticles } from '../features/articles/articles.slice';
import { useAppDispatch } from './useAppDispatch';

export const useAutoScanning = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval;
    (async () => {
      await dispatch(fetchNearbyArticles());
      interval = setInterval(() => dispatch(fetchNearbyArticles()), 60000);
    })();
    return () => clearInterval(interval);
  }, []);
};
