"use client";

import { PostCard } from "@/app/_components/postCard/postCard";
import { Article } from "@/types/post";
import {
  Avatar,
  Box,
  Center,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@yamada-ui/react";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserArticles } from "../api/article/article";
import { userAtom } from "../atoms/atom";

const Page = () => {
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
        <Text>Loading...</Text>
      </Center>
    );
  }

  if (status !== "authenticated") {
    redirect("/login");
    return null;
  }

  return (
    <Box bgColor={"gray.50"} py={8}>
      <Flex justify="center" mb={6}>
        {user ? (
          <Flex
            direction={{ base: "column", sm: "row" }}
            w="90%"
            maxW="600px"
            p={6}
            bgColor={"white"}
            borderRadius={"lg"}
            boxShadow="md"
          >
            <Avatar size="xl" name={user.name} src={user.icon_url} />
            <Box ml={{ sm: 6 }} mt={{ base: 4, sm: 0 }}>
              <Text fontSize={"2xl"} fontWeight="bold">
                {user.name}
              </Text>
              <Flex justify="space-between" mt={4} gap={4}>
                <Text>投稿数: {user.total_posts_articles}</Text>
                <Text>いいね数: {user.total_get_likes}</Text>
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex
            direction={{ base: "column", sm: "row" }}
            w="90%"
            maxW="600px"
            p={6}
            bgColor={"white"}
            borderRadius={"lg"}
            boxShadow="md"
          >
            <SkeletonCircle size="xl" />
            <Box ml={{ sm: 6 }} mt={{ base: 4, sm: 0 }} flex="1">
              <SkeletonText w="60%" />
              <SkeletonText mt={4} />
            </Box>
          </Flex>
        )}
      </Flex>

      <Flex justify="center" mb={4}>
        <Text fontSize={"lg"} fontWeight="bold">
          投稿した記事
        </Text>
      </Flex>

      {posts ? (
        <VStack rounded="6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </VStack>
      ) : (
        <Center>
          <VStack gapY={"2xl"} margin={"xl"}>
            <Text textAlign={"center"}>まだ投稿がありません。</Text>
          </VStack>
        </Center>
      )}
    </Box>
  );
};

export default Page;
