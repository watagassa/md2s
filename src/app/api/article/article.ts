import { Article, ArticleRequest } from "@/types/post";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/articles";

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
