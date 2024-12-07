import { UUID } from "crypto";

export interface User {
  id: UUID;
  name: string;
  icon_url: string;
  google_id: string;
  qiita_link: boolean;
  total_posts_articles: number;
  total_get_likes: number;
}
