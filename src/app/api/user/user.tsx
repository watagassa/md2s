import { User } from "@/types/user";

import { Session } from "next-auth";

//ユーザー登録 API
export const postUser = async (session: Session | null) => {
  const postAPI = process.env.NEXT_PUBLIC_API_URL + "/users";
  const name = session?.user?.name;
  const iconUrl = session?.user?.image;
  const googleId = session?.sub;

  if (session?.idToken) {
    const res = await fetch(postAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
      },
      body: JSON.stringify({
        name: name,
        icon_url: iconUrl,
        google_id: googleId,
      }),
    });

    const data = await res.json();
    console.log(data);
  }
};

export const getQiitaCode = async (session: Session | null) => {
  const cliant_id = process.env.NEXT_PUBLIC_QIITA_CLIENT_ID;
  const api = `https://qiita.com/api/v2/oauth/authorize?client_id=${cliant_id}&scope=read_qiita&state=bb17785d811bb1913ef54b0a7657de780defaa2d`;

  if (session?.idToken) {
    // apiを叩いてcodeを取得
    window.open(api, "_self");
  }
};

export const getQiitaToken = async (code: string, session: Session | null) => {
  const postAPI = process.env.NEXT_PUBLIC_API_URL + "/qiita";

  try {
    if (code && session?.idToken) {
      const res = await fetch(postAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken}`,
        },
        body: JSON.stringify({
          qiita_code: code,
        }),
      });

      const data = await res.json();
      console.log(data);
    }
  } catch (error) {
    console.error("Error fetching qiita token:", error);
  }
};
//ユーザー(自分)取得 API
export const getUser = async (
  session: Session | null
): Promise<User | null> => {
  const getAPI = process.env.NEXT_PUBLIC_API_URL + "/users";
  try {
    if (session?.idToken) {
      const res = await fetch(getAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken}`,
        },
      });

      if (!res.ok) {
        console.error(`Failed to get user: ${res.status}`);
        return null;
      }

      const data: User = await res.json();
      console.log(data);
      return data;
    } else {
      console.log("session?.idTokenが受け取れませんでした.");
      return null;
    }
  } catch (error) {
    console.log("Error getting user:", error);
    return null;
  }
};
