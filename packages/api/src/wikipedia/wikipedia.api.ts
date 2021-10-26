import wiki from 'wikijs';
import { SUPPORTED_LANGUAGES } from '../runtime.config';

export interface WikiApiFetchNearByArticlesOptions {
  lang: typeof SUPPORTED_LANGUAGES[number];
  radius: number;
}
const fetchNearByArticles = async (
  lat,
  lon,
  options: WikiApiFetchNearByArticlesOptions,
) => {
  const wikipedia = wiki({
    apiUrl: `https://${options.lang}.wikipedia.org/w/api.php`,
  });

  return await Promise.all(
    (await wikipedia.geoSearch(lat, lon, options.radius))
      .filter((title) => !!title)
      .map((title) => wikipedia.page(title)),
  );
};

export const wikipediaAPI = {
  fetchNearByArticles,
};
