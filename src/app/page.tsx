import { PostCard } from "@/app/_components/postCard/postCard";
import { Box, VStack, Text, Flex } from "@yamada-ui/react";
import { getArticles } from "./api/article/article";

export default async function Home() {
  // const posts = testPostData2; //取得した記事データ
  const posts = await getArticles(5, 0);
  return (
    <Box bgColor={"blackAlpha.50"} py={"xl"}>
      <Flex justify="center">
        <Text w="max(67%, sm)" p={"md"} fontSize={"xl"} fontWeight="bold">
          おすすめ
        </Text>
      </Flex>
      <VStack gap={"md"}>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </VStack>
    </Box>
  );
}
