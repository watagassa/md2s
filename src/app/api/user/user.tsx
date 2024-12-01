import { Session } from "next-auth";

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
