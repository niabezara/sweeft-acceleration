export type Exif = {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
};

export type Position = {
  latitude: number;
  longitude: number;
};

export type Location = {
  city: string;
  country: string;
  position: Position;
};

export type Tag = {
  title: string;
};

export type Collection = {
  id: number;
  title: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  cover_photo: any; // You may need to define a type for cover_photo
  user: any; // You may need to define a type for user
};

export type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};

export type Links = {
  self: string;
  html: string;
  download: string;
  download_location: string;
};

export type User = {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
  };
};

export type Photo = {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  downloads: number;
  likes: number;
  liked_by_user: boolean;
  public_domain: boolean;
  description: string;
  exif: Exif;
  location: Location;
  tags: Tag[];
  current_user_collections: Collection[];
  urls: Urls;
  links: Links;
  user: User;
};