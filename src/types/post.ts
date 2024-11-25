// パラメーター 'post' の型は暗黙的に 'any' になります。ってうるさいからやった
export interface User {
  id: string;
  name: string;
  icon: string;
  google_id: string;
  total_posts_articles: number;
  total_get_likes: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  create_user_id: string;
  user_name: string;
  user_icon: string;
  title: string;
  main_MD: string;
  slide_MD: string;
  created_at: string;
  updated_at: string;
  like_count: number;
  public: boolean;
  qiita_article: boolean;
  tags: Tag[];
}
