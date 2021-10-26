export interface Section {
  title: string;
  text: string;
  children: Section[];
}

export interface Article {
  title: string;
  url: string;
  pageID: string;
  summary: string;
  sections: Section[];
  images: any;
  categories: string[];
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  read?: boolean;
  distance?: any;
  voiceDurations: {
    de: number;
    en: number;
  };
}
