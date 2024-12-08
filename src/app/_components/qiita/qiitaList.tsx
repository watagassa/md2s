"use client";

import { useAtom } from "jotai";
import { userAtom } from "../../atoms/atom";
import { PostCard } from "../postCard/postCard";
import { use } from "react";
import { Box } from "@yamada-ui/react";
import { Flex, VStack, Text } from "@yamada-ui/react";
import { Tag } from "../../../types/post";
import { table } from "console";

const QiitaList = ({ qiitaPosts }: { qiitaPosts: any }) => {
  const [user, setUser] = useAtom(userAtom);

  const posts = qiitaPosts.map((post: any) => {
    // tag配列をオブジェクト配列に変換;
    const tags: Tag = post.tags.map((tag: any) => {
      return {
        id: tag.length,
        word: tag,
      };
    });

    return {
      id: post.id,
      title: post.title,
      create_user_id: user?.id,
      body: post.body,
      icon_url: user?.icon_url,
      main_MD: post.body,
      slide_MD: "",
      name: user?.name,
      created_at: post.created_at,
      updated_at: post.updated_at,
      likes_count: post.likes_count,
      public: false,
      tags: tags,
      qiita_article: true,
    };
  });

  return (
    <div>
      <Box bgColor={"blackAlpha.50"} py={"xl"}>
        <VStack gap={"md"}>
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </VStack>
      </Box>
    </div>
  );
};

export default QiitaList;
