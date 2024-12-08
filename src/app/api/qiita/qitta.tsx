import { Article } from "@/types/post";
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

    const data: Article[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error got articles:", error);
    return null;
  }
};
