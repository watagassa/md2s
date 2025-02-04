"use client";
import React from "react";
import MdSlideToggle from "@/app/_components/mdToSlide/MdSlideToggle";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Tag,
  Center,
  VStack,
  HStack,
} from "@yamada-ui/react";
import SlidePreview from "@/app/_components/slide/SlidePreview";
import FavoriteButton from "@/app/_components/favoriteButton/favoriteButton";
import { Markdown } from "@yamada-ui/markdown";
import { Article } from "@/types/post";

interface PageProps {
  post: Article;
  createdDateStr: string;
  updatedDateStr: string;
  isMarkdownView: boolean;
  setIsMarkdownView: React.Dispatch<React.SetStateAction<boolean>>;
}
const Page = ({
  post,
  createdDateStr,
  updatedDateStr,
  isMarkdownView,
  setIsMarkdownView,
}: PageProps) => {
  return (
    <Box paddingInline="9%" paddingTop={"lg"}>
      <HStack marginInline={"xl"} mb={"md"}>
        <VStack m={"xs"} gapY={"md"}>
          <Flex>
            <Avatar size="sm" name={post.name} src={post.icon_url} />
            <Center fontSize={"lg"} paddingInline={"sm"}>
              {post.name}
            </Center>
          </Flex>
          <Text fontSize="4xl" fontWeight={"bold"}>
            {post.title}
          </Text>
          <Flex gap="md">
            {post.tags.map((tag) => (
              <Tag
                key={tag.id}
                paddingInline="sm"
                bgColor={"neutral.50"}
                color={"black"}
              >
                {tag.word}
              </Tag>
            ))}
          </Flex>
          <HStack>
            <Text>投稿日：{createdDateStr}</Text>
            <Text>更新日：{updatedDateStr}</Text>
          </HStack>
        </VStack>
        <VStack gapY={"xl"} align={"end"} flex={"end"} pt={"xl"}>
          <FavoriteButton
            countFavorite={post.like_count}
            article_id={post.id}
          />
          <Box>
            <MdSlideToggle
              isMarkdownView={isMarkdownView}
              setIsMarkdownView={setIsMarkdownView}
            />
          </Box>
        </VStack>
      </HStack>
      {isMarkdownView ? (
        <Box p={"xl"} bgColor={"whiteAlpha.950"} rounded={"lg"}>
          <Markdown>{post.main_MD}</Markdown>
        </Box>
      ) : (
        <SlidePreview slide={post.slide_MD} />
      )}
    </Box>
  );
};

export default Page;
