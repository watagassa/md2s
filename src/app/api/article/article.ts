import { Article, ArticleRequest } from "@/types/post";
import { UUID } from "crypto";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/articles";

//記事登録
export const createArticle = async (
  idToken: string,
  articleData: ArticleRequest
): Promise<Article | null> => {
  try {
    const res = await fetch(baseURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`, // トークンをヘッダーに含める
      },
      body: JSON.stringify(articleData),
    });

    if (!res.ok) {
      console.error(`Failed to create article: ${res.status}`);
      return null;
    }

    const data: Article = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating article:", error);
    return null;
  }
};

//不特定記事一覧取得
export const getArticles = async (
  limit: number,
  offset: number
): Promise<Article[] | null> => {
  const getAPI =
    process.env.NEXT_PUBLIC_API_URL +
    "/articles?limit=" +
    limit +
    "&offset=" +
    offset;

  try {
    const res = await fetch(getAPI, {
      method: "GET",
    });

    if (!res.ok) {
      console.error(`Failed to create article: ${res.status}`);
      return null;
    }

    const data: Article[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error got articles:", error);
    return null;
  }
};

//特定のユーザーの記事一覧取得
export const getUserArticles = async (
  userId: UUID
): Promise<Article[] | null> => {
  const user_id = userId;
  const getAPI = process.env.NEXT_PUBLIC_API_URL + "/articles/user/" + user_id;

  try {
    const res = await fetch(getAPI, {
      method: "GET",
    });

    if (!res.ok) {
      console.error(`Failed to get articles: ${res.status}`);
      return null;
    }

    const data: Article[] = await res.json();
    return data;
  } catch (error) {
    console.log("Error got articles", error);
    return null;
  }
};

//特定記事取得
export const getParticularArticle = async (
  article_id: number
): Promise<Article | null> => {
  const getAPI = process.env.NEXT_PUBLIC_API_URL + "/articles/" + article_id;
  try {
    const res = await fetch(getAPI, {
      method: "GET",
    });

    if (!res.ok) {
      console.error(`Failed to get article: ${res.status}`);
      return null;
    }

    const data: Article = await res.json();
    return data;
  } catch (error) {
    console.error("Error got articles:", error);
    return null;
  }
};

//記事検索
export const searchArticles = async (keyword: string): Promise<Article[]> => {
  const getAPI =
    process.env.NEXT_PUBLIC_API_URL + "/articles/search?keyword=" + keyword;
  try {
    const res = await fetch(getAPI, {
      method: "GET",
    });

    if (!res.ok) {
      console.error(`Failed to search article: ${res.status}`);
      return [];
    }

    const data: Article[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error got articles:", error);
    return [];
  }
};

// 記事更新
export const updateArticle = async (
  idToken: string,
  article_id: number,
  articleData: ArticleRequest
): Promise<Article | null> => {
  try {
    const res = await fetch(baseURL + "/" + article_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // 必要なら追加
        Authorization: `Bearer ${idToken}`, // トークンをヘッダーに含める
      },
      body: JSON.stringify(articleData),
    });

    if (!res.ok) {
      console.error(`Failed to update article: ${res.status}`);
      return null;
    }

    const data: Article = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating article:", error);
    return null;
  }
};
