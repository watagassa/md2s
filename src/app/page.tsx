import { testPostData2 } from "@/app/_testData";
import { PostCard } from "@/app/_components/postCard/postCard";
import { Box, VStack, Text, Flex } from "@yamada-ui/react";

export default function Home() {
  const posts = testPostData2; //取得した記事データ

  return (
    <Box bgColor={"blackAlpha.50"} py={"xl"}>
      <Flex justify="center" >
        <Text w="max(80%, sm)" p={"md"}>
          おすすめ
        </Text>
      </Flex>
      <VStack gap={"md"}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </VStack>
    </Box>
  );
}
