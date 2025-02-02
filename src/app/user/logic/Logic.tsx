"use client";

import { Article } from "@/types/post";
import { Center, Loading } from "@yamada-ui/react";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserArticles } from "../../api/article/article";
import { userAtom } from "../../atoms/atom";
import UserPage from "../view";

export default function PostPageLogic() {
  const { status } = useSession();
  const [posts, setPosts] = useState<Article[] | null>(null);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    if (status === "authenticated" && user) {
      getUserArticles(user.id).then((data) => setPosts(data));
    }
  }, [status, user]);

  if (status === "loading") {
    return (
      <Center height="100vh">
        <Loading variant="oval" fontSize="8xl" color="indigo.700" />
      </Center>
    );
  }

  if (status !== "authenticated") {
    redirect("/login");
    return null;
  }

  return <UserPage posts={posts} user={user} />;
}
