"use client";
import React from "react";
import { testPostData2 } from "@/app/_testData";
import { PostCard } from "@/app/_components/postCard/postCard";
import {
  Box,
  VStack,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Card
} from "@yamada-ui/react";
import { SearchIcon } from "@yamada-ui/lucide";

export default function SearchPost() {
  const posts = testPostData2; //取得したユーザーが投稿した記事データ

  return (
    <Box bgColor={"blackAlpha.50"} py={"xl"}>
      <Flex justify="center">
        <Text w="max(50%, sm)" paddingInline={"md"} paddingBottom={"sm"}>
          記事を検索
        </Text>
      </Flex>
      <Flex justify="center" paddingBottom={"lg"}>
        <Card bgColor={"whiteAlpha.950"} w="max(50%, sm)">
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color={"indigo.700"} />
            </InputLeftElement>
            <Input type="search" placeholder="search" />
          </InputGroup>
        </Card>
      </Flex>
      <VStack gap={"md"}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </VStack>
    </Box>
  );
}
