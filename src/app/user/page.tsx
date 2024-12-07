"use client"

import React, { useState, useEffect } from "react";
import { testPostData2, testUserData } from "@/app/_testData";
import { PostCard } from "@/app/_components/postCard/postCard";
import {
  Box,
  VStack,
  Avatar,
  Flex,
  Text,
  Spacer,
  HStack,
  SkeletonCircle,
  SkeletonText,
} from "@yamada-ui/react";
import { useSession } from "next-auth/react";
import { getUser } from "../api/user/user";
import { User } from "@/types/user";

const page = () => {
  const posts = testPostData2; //取得したユーザーが投稿した記事データ
  // const user = testUserData; //取得したユーザーデータ

  const { data: session, status }= useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userResult = await getUser(session);
      setUser(userResult); // User | null を直接セット
    };

    fetchUser();
  }, [session]);


  return (
    <Box bgColor={"blackAlpha.50"} py={"md"}>
      <Flex justify="center" m={"normal"}>
        {user != null ? (
          <Flex w="max(50%, sm)" p={"normal"} bgColor={"whiteAlpha.950"}>
            <Avatar size="xl" name={user.name} src={user.icon_url} />
            <Box px={"lg"}>
              <Text fontSize={"3xl"}>{user.name}</Text>
              <HStack pt={"md"}>
                {/* TODO:user名が伸びると下の二つの要素の間が離れていくの修正できたらいいね... */}
                <Text>投稿数：{user.total_posts_articles}</Text>
                <Spacer />
                <Text>獲得いいね数：{user.total_get_likes}</Text>
              </HStack>
            </Box>
          </Flex>
        ) : (
          <Flex w="max(50%, sm)" p={"normal"} bgColor={"whiteAlpha.950"}>
            <SkeletonCircle size="xl" />
            <Box px={"lg"}>
              <SkeletonText />
              <HStack pt={"md"}>
                {/* TODO:user名が伸びると下の二つの要素の間が離れていくの修正できたらいいね... */}
                <SkeletonText/>
                <Spacer />
                <SkeletonText />
              </HStack>
            </Box>
          </Flex>
        )}
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
