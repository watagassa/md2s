"use client";
import React, { use, useEffect, useState } from "react";
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
import MarkdownPreview from "@/app/_components/markdown/MarkdownPreview";
import SlidePreview from "@/app/_components/slide/SlidePreview";
import FavoriteButton from "@/app/_components/favoriteButton/favoriteButton";
import { Article, DefaultArticle } from "@/types/post";
import { testPostData } from "@/app/_testData";

const PostView = ({ params }: { params: Promise<{ post_id: string }> }) => {
  const { post_id } = use(params); // Promiseを解決
  const [post, setPost] = useState<Article>(DefaultArticle);
  const fetchPost = async () => {};
  useEffect(() => {
    fetchPost();
    setPost(testPostData);
  }, []);
  console.log(post_id);

  // 仮置きデータ
  // const post = testPostData;

  const [isMarkdownView, setIsMarkdownView] = useState(true);

  const created_date: Date = new Date(post.created_at);
  const createdDateStr: string =
    created_date.getUTCFullYear() +
    "年" +
    (created_date.getUTCMonth() + 1) +
    "月" +
    created_date.getUTCDate() +
    "日";
  const updated_date: Date = new Date(post.updated_at);
  const updatedDateStr: string =
    updated_date.getUTCFullYear() +
    "年" +
    (updated_date.getUTCMonth() + 1) +
    "月" +
    updated_date.getUTCDate() +
    "日";
  return (
    <Box paddingInline="9%" paddingTop={"lg"}>
      <HStack marginInline={"xl"} mb={"md"}>
        <VStack m={"xs"} gapY={"md"}>
          <Flex>
            <Avatar size="sm" name={post.user_name} src={post.user_icon} />
            <Center fontSize={"lg"} paddingInline={"sm"}>
              {post.user_name}
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
          <Text>投稿日：{createdDateStr}</Text>
          <Text>更新日：{updatedDateStr}</Text>
        </VStack>
        <VStack gapY={"xl"} align={"end"} flex={"end"} pt={"xl"}>
          <FavoriteButton countFavorite={post.like_count} />
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
          <MarkdownPreview md={post.main_MD} />
        </Box>
      ) : (
        <SlidePreview slide={post.slide_MD} />
      )}
    </Box>
  );
};

export default PostView;
