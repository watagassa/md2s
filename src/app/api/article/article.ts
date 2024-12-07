import { Article, ArticleRequest } from "@/types/post";
import { Session } from "next-auth";

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (!res.ok) {
      console.error(`Failed to create article: ${res.status}`);
      return null;
    }

    const data: Article = await res.json();
    console.log(data);
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
  const getAPI = process.env.NEXT_PUBLIC_API_URL + "/articles?limit=" + limit + "&offset=" + offset;

  try {
    const res = await fetch(getAPI, {
      method: "GET"
    });

    if (!res.ok) {
      console.error(`Failed to create article: ${res.status}`);
      return null;
    }

    const data: Article[] = await res.json();
    console.log(data);
    return data;
  } catch(error) {
    console.error("Error got articles:", error);
    return null;
  }
};

//特定のユーザーの記事一覧取得
export const getUserArticles = async (session: Session | null): Promise<Article[] | null> => {
  const user_id = session?.idToken
  const getAPI = process.env.NEXT_PUBLIC_API_URL + "/articles/user/" + user_id;

  try {
    const res = await fetch(getAPI, {
      method: "POST",
    });

    if(!res.ok) {
      console.error(`Failed to get articles: ${res.status}`);
      return null;
    }

    const data: Article[] = await res.json();
    console.log("ユーザの記事データ:", data);
    return data;
  } catch(error) {
    console.log("Error got articles", error);
    return null;
  }
}

//特定記事取得
export const getParticularArticle = async (
  article_id: number,
): Promise<Article | null > => {
  const getAPI = process.env.NEXT_PUBLIC_API_URL + "/articles/" + article_id;
  try {
    const res = await fetch(getAPI, {
      method: "GET"
    });

    if(!res.ok) {
      console.error(`Failed to get article: ${res.status}`);
      return null;
    }

    const data: Article = await res.json();
    console.log("取得した記事データ:",data);
    return data;
  } catch(error) {
    console.error("Error got articles:", error);
    return null;
  }
}

//記事検索
export const searchArticles = async (keyword: string): Promise<Article[] | null> => {
  const getAPI = process.env.NEXT_PUBLIC_API_URL + "/articles/search?keyword=" + keyword;
  try{
    const res = await fetch(getAPI, {
      method: "GET",
    });

    if (!res.ok) {
      console.error(`Failed to create article: ${res.status}`);
      return null;
    }

    const data: Article[] = await res.json();
    console.log("検索した記事データ:", data);
    return data;
  } catch (error) {
    console.error("Error got articles:", error);
    return null;
  }
};
