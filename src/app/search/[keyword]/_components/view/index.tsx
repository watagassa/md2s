"use client";
import React, { type Dispatch, type SetStateAction } from "react";
import { PostCard } from "@/app/_components/postCard/postCard";
import {
  Box,
  VStack,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Card,
} from "@yamada-ui/react";
import { SearchIcon } from "@yamada-ui/lucide";
import { Article } from "@/types/post";
import { redirect } from "next/navigation";

interface PageProps {
  posts: Article[];
  inputKeyword: string;
  setInputKeyword: Dispatch<SetStateAction<string>>;
}

export default function SearchPostKeyword({
  posts,
  inputKeyword,
  setInputKeyword,
}: PageProps) {
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
            <Input
              type="search"
              placeholder="search"
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)} // 入力値を更新
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  redirect(`/search/${inputKeyword}`);
                }
              }}
            />
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
