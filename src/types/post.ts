export interface Tag {
  id: string;
  word: string;
}

export interface Article {
  id: number;
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

export const DefaultArticle: Article = {
  id: 0,
  create_user_id: "",
  user_name: "",
  user_icon: "",
  title: "",
  main_MD: "",
  slide_MD: "",
  created_at: "0000-01-01T00:00:00Z",
  updated_at: "0000-01-01T00:00:00Z",
  like_count: 0,
  public: true,
  qiita_article: false,
  tags: [],
};

export type ArticleRequest = {
  title: string;
  main_MD: string;
  slide_MD: string;
  public: boolean;
  qiita_article: boolean;
  tags: Tag[];
};

export const DefaultPostArticle: ArticleRequest = {
  title: "",
  main_MD: "",
  slide_MD: "",
  public: false,
  qiita_article: false,
  tags: [],
};
