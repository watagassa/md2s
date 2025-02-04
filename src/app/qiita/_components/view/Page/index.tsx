import { Box, Flex, Text, VStack } from "@yamada-ui/react";
import { QiitaPostCard } from "@/app/_components/qiita/qiitaPostCard";
import { Article } from "@/types/post";

interface PageProps {
  qiitaPosts: Article[];
}
const Page = async ({ qiitaPosts }: PageProps) => {
  return (
    <Box bgColor={"blackAlpha.50"} py={"xl"}>
      <Flex justify="center">
        <Text w="max(67%, sm)" p={"md"} fontSize={"xl"} fontWeight="bold">
          あなたのQiita記事一覧
        </Text>
      </Flex>
      <VStack gap={"md"}>
        {qiitaPosts?.map((post) => (
          <QiitaPostCard key={post.id} post={post} isQiita={true} />
        ))}
      </VStack>
    </Box>
  );
};

export default Page;
