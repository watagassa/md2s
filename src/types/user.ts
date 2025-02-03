import { UUID } from "crypto";

export interface User {
  id: UUID;
  name: string;
  icon_url: string;
  google_id: string;
  qiita_link: boolean;
  total_article_count: number;
  total_get_like_count: number;
}
