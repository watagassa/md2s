export interface Tag {
  id: number;
  word: string;
}

export interface Article {
  id: number;
  create_user_id: string;
  name: string;
  icon_url: string;
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

export type QittaList = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  url: string;
  tags: string[];
  private: boolean;
  likes_count: number;

  // Id          string   json:"id"
  // Title       string   json:"title"
  // Body        string   json:"body"
  // CreatedAt   string   json:"created_at"
  // UpdatedAt   string   json:"updated_at"
  // Url         string   json:"url"
  // Tags        []string json:"tags"
  // Private     bool     json:"private"
  // LikesCount  int      json:"likes_count"
};

export const DefaultArticle: Article = {
  id: 0,
  create_user_id: "",
  name: "",
  icon_url: "",
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
