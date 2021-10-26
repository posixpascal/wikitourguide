import { Article } from './article';

export const articleCover = (article: Article) => {
  const images = article.images || [];
  const firstSuitableImage = images
    .filter((image) => !!image.toLowerCase)
    .map((image) => image.toLowerCase())
    .findIndex(
      (image) => image.indexOf('.png') > -1 || image.indexOf('.jpg') > -1,
    );

  return firstSuitableImage ? images[firstSuitableImage] : null;
};

export const formatDistance = (num, digits) => {
  const lookup = [
    { value: 1, symbol: 'm' },
    { value: 1e3, symbol: 'km' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};
