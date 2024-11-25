import React from "react";
import { testPostData2, testUserData } from "@/app/_testData";
import { PostCard } from "@/app/_components/postCard/postCard";
import { Box, VStack, Avatar, Flex, Text } from "@yamada-ui/react";

const page = () => {
  const posts = testPostData2; //取得したユーザーが投稿した記事データ
  const user = testUserData; //取得したユーザーデータ

  return (
    <Box bgColor={"blackAlpha.50"} py={"xl"}>
      <Flex justify="center">
        <Flex w="max(80%, sm)" p={"md"} bgColor={"whiteAlpha.950"}>
          <Avatar size="normal" name={user.name} src={user.icon} />
          <Box>
            <Text>{user.name}</Text>
            <Flex>
              <Text>投稿数：{user.total_posts_articles}</Text>
              <Text>獲得いいね数：{user.total_get_likes}</Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <VStack gap={"md"}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </VStack>
    </Box>
  );
};

export default page;
