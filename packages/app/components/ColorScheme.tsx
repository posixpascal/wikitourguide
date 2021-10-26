import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { hydrateSettings } from '../features/settings/settings.slice';

export function ColorScheme({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hydrateSettings());
  }, []);

  return children;
}
