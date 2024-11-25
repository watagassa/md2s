import React from "react";
import { testPostData2, testUserData } from "@/app/_testData";
import { PostCard } from "@/app/_components/postCard/postCard";
import { Box, VStack, Text, Flex } from "@yamada-ui/react";

const page = () => {
  const posts = testPostData2; //取得した記事データ
  const user = testUserData; //取得したユーザーデータ

  return (
    <Box bgColor={"blackAlpha.50"} py={"xl"} boxSize={"full"}>
      <Flex justify="center">
        <Text w="max(80%, sm)" p={"md"}>
          Userページ
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
