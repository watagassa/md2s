"use client";
import { qiitaPostAtom } from "@/app/atoms/atom";
import { Article } from "@/types/post";
import { CardBody, useHover, Text } from "@yamada-ui/react";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

interface PostTitleProps {
  post: Article;
}

const QiitaPostTitle = ({ post }: PostTitleProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [qiitaPost, setQiitaPost] = useAtom(qiitaPostAtom);

  useEffect(() => {
    console.log("post=", qiitaPost);
    if (post == qiitaPost) {
      redirect(`/qiita/post`);
    }
  }, [qiitaPost]);
  const { hovered, ref } = useHover();
  return (
    <CardBody
      onClick={() => {
        setQiitaPost(post);
      }}
      fontSize="xl"
      p={"sm"}
      pl={"normal"}
      ref={ref}
    >
      {hovered ? (
        <Text
          cursor={"pointer"}
          borderBottom={"1.5px solid #898989"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          m={"xs"}
        >
          {post.title}
        </Text>
      ) : (
        <Text
          mb="calc($spaces.1.5)"
          mt={"xs"}
          marginInline={"xs"}
          fontSize={"2xl"}
          fontWeight={"bold"}
        >
          {" "}
          {post.title}
        </Text>
      )}
    </CardBody>
  );
};

export default QiitaPostTitle;
