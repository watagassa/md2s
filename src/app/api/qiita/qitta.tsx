import { Article, QittaList } from "@/types/post";
import { Session } from "next-auth";

export const getQiitaArticles = async (
  session: Session | null
): Promise<Article[] | null> => {
  const getAPI = process.env.NEXT_PUBLIC_API_URL + "/qiita";
  if (!session?.idToken) {
    console.error("session?.idToken is not found.");
    return null;
  }
  try {
    const res = await fetch(getAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
      },
    });

    if (!res.ok) {
      console.error(`Failed to get articles: ${res.status}`);
      return null;
    }

    const data: QittaList[] = await res.json();
    const articleData: Article[] = data.map((e, index) => {
      return {
        id: index,
        create_user_id: "",
        name: "",
        icon_url: "",
        title: e.title,
        main_MD: e.body,
        slide_MD: "",
        created_at: e.created_at,
        updated_at: e.updated_at,
        like_count: e.likes_count,
        public: e.private,
        qiita_article: true,
        tags: e.tags.map((word, index) => {
          return { id: index, word: word };
        }),
      };
    });
    return articleData;
  } catch (error) {
    console.error("Error got articles:", error);
    return null;
  }
};
