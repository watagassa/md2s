import { getServerSession } from "next-auth";
import { getQiitaArticles } from "../api/qiita/qitta";
import { nextAuthOptions } from "../_utils/nextAuth/next-auth-options";
import { Box, Flex, Text, VStack } from "@yamada-ui/react";
import { QiitaPostCard } from "../_components/qiita/qiitaPostCard";
import { getUser } from "../api/user/user";

const Page = async () => {
  const session = await getServerSession(nextAuthOptions);
  const myData = await getUser(session);

  if (!session) {
    return <div>ログインしてください。</div>;
  }
  const qiitaPosts = await getQiitaArticles(session); // 非同期処理
  qiitaPosts?.map((e) => {
    if (myData) {
      e.create_user_id = String(myData.id);
      e.name = myData.name;
      e.icon_url = myData.icon_url;
    }
  });
  if (!qiitaPosts) {
    return <div>記事が見つかりませんでした。</div>;
  }
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
