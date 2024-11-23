// パラメーター 'post' の型は暗黙的に 'any' になります。ってうるさいからやった
export interface User {
  id: number;
  name: string;
  icon: string
}

export interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  user: User;
  create_user_id: string;
  title: string;
  main_MD: string;
  slide_MD: string;
  created_at: string;
  updated_at: string;
  like_count: number;
  public: boolean;
  tags: Tag[];
}