"use client";
import React, { useState } from "react";
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
  Button,
} from "@yamada-ui/react";
import SlidePreview from "@/app/_components/slide/SlidePreview";
import FavoriteButton from "@/app/_components/favoriteButton/favoriteButton";
import { Markdown } from "@yamada-ui/markdown";
import { qiitaPostAtom } from "@/app/atoms/atom";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

const QiitaPostView = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [post, setPost] = useAtom(qiitaPostAtom);
  console.log("post=", post);
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
      <Button
        onClick={() => {
          redirect(`/qiita/post/new`);
        }}
      >
        この記事をmd2sの記事としてimport
      </Button>
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
            {post.tags?.map((tag) => (
              <Tag
                key={uuidv4()}
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
          <Markdown>{post.main_MD}</Markdown>
        </Box>
      ) : (
        <SlidePreview slide={post.slide_MD} />
      )}
    </Box>
  );
};

export default QiitaPostView;
