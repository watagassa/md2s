import { Session } from "next-auth";

//いいねを登録する
export const registLike = async (
  session: Session | null,
  articleId: number
) => {
  const postAPI = process.env.NEXT_PUBLIC_API_URL + "/likes";
  try {
    if (session?.idToken) {
      const res = await fetch(postAPI, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.idToken}`, // トークンをヘッダーに含める
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article_id: articleId }),
      });

      if (!res.ok) {
        console.error(`Failed to regist like: ${res.status}`);
        return null;
      }
    } else {
      console.log("idTokenが取得できませんでした。");
      return null;
    }
  } catch (error) {
    console.error("Error resisting like:", error);
    return null;
  }
};

// いいねを取り消す
export const deleteLike = async (
  session: Session | null,
  article_id: number
) => {
  const deleteAPI = process.env.NEXT_PUBLIC_API_URL + "/likes" + article_id;
  try {
    if (session?.idToken) {
      const res = await fetch(deleteAPI, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.idToken}`, // トークンをヘッダーに含める
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error(`Failed to create article: ${res.status}`);
        return null;
      }

      const data: string = await res.json();
    } else {
      console.log("idTokenが取得できませんでした。");
      return null;
    }
  } catch (error) {
    console.error("Error deleting like:", error);
    return null;
  }
};

//ユーザーがいいねしたかどうかを取得する
export const getUserLike = async (
  session: Session | null,
  article_id: number
): Promise<boolean | null> => {
  const postAPI = process.env.NEXT_PUBLIC_API_URL + "/likes" + article_id;
  try {
    if (session?.idToken) {
      const res = await fetch(postAPI, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.idToken}`, // トークンをヘッダーに含める
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error(`Failed to create article: ${res.status}`);
        return null;
      }

      const data: boolean = await res.json();
      return data;
    } else {
      console.log("idTokenが取得できませんでした。");
      return null;
    }
  } catch (error) {
    console.error("Error getting like:", error);
    return null;
  }
};
