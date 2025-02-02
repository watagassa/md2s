"use client";

import { PostCard } from "@/app/_components/postCard/postCard";
import { Article } from "@/types/post";
import { User } from "@/types/user";
import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from "@yamada-ui/react";

interface PageProps {
  posts: Article[] | null;
  user: User | null;
}

export default function Page({ posts, user }: PageProps) {
  return (
    <Box bgColor={"blackAlpha.50"} py={"md"}>
      <Flex justify="center" m={"normal"}>
        {user ? (
          <HStack
            w="max(50%, sm)"
            p={"lg"}
            bgColor={"whiteAlpha.950"}
            borderRadius={"lg"}
            boxShadow="md"
          >
            <Avatar size="xl" name={user.name} src={user.icon_url} />
            <VStack ml={"md"}>
              <Text fontSize={"3xl"} fontWeight="bold">
                {user.name}
              </Text>
              <HStack mt={"md"} gap={"2xl"}>
                <Text fontSize={"lg"}>投稿数: {user.total_article_count}</Text>
                <Text fontSize={"lg"}>
                  獲得いいね数: {user.total_get_like_count}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        ) : (
          <HStack
            w="max(50%, sm)"
            p={"xl"}
            bgColor={"whiteAlpha.950"}
            borderRadius={"lg"}
            boxShadow="md"
          >
            <SkeletonCircle size="4xl" />
            <VStack ml={"md"}>
              <SkeletonText w="60%" />
              <SkeletonText mt={4} />
            </VStack>
          </HStack>
        )}
      </Flex>
      <Flex justify="center" paddingTop={"sm"}>
        <Text w="max(70%, sm)" p={"md"} fontSize={"xl"} fontWeight="bold">
          投稿した記事
        </Text>
      </Flex>
      {posts ? (
        <VStack gap={"md"}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </VStack>
      ) : (
        <Center></Center>
      )}
    </Box>
  );
}
