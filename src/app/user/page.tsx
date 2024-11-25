import React from "react";
import { testPostData2, testUserData } from "@/app/_testData";
import { PostCard } from "@/app/_components/postCard/postCard";
import { Box, VStack, Avatar, Flex, Text, Spacer, HStack } from "@yamada-ui/react";

const page = () => {
  const posts = testPostData2; //取得したユーザーが投稿した記事データ
  const user = testUserData; //取得したユーザーデータ

  return (
    <Box bgColor={"blackAlpha.50"} py={"md"}>
      <Flex justify="center" m={"normal"}>
        <Flex w="max(50%, sm)" p={"normal"} bgColor={"whiteAlpha.950"}>
          <Avatar size="xl" name={user.name} src={user.icon} />
          <Box px={"lg"}>
            <Text fontSize={"3xl"}>{user.name}</Text>
            <HStack  pt={"md"}>
              {/* TODO:user名が伸びると下の二つの要素の間が離れていくの修正 */}
              <Text>投稿数：{user.total_posts_articles}</Text>
              <Spacer />
              <Text>獲得いいね数：{user.total_get_likes}</Text>
            </HStack>
          </Box>
        </Flex>
      </Flex>
      <Flex justify="center">
        <Text w="max(80%, sm)" p={"md"} fontSize={"lg"}>
          投稿した記事
        </Text>
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
