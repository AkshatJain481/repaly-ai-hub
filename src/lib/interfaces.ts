
export interface PlatformAccountProps {
  platformName: string;
  access_token: string;
  created_time: string;
  id: string;
  media_count: number;
  name: string;
  updated_time: string;
  user_id: string;
  username: string;
  profile_picture_url: string;
}

export interface Media {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  likes_count: number;
  comments_count: number;
  shares_count?: number;
}

export interface Story {
  id: string;
  media_url: string;
  timestamp: string;
  likes_count?: number;
  viewed: boolean;
}

export interface ThemeMode {
  mode: 'light' | 'dark' | 'system';
}
