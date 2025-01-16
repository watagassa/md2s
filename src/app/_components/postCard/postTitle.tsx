"use client";
import { CardBody, useHover, Text } from "@yamada-ui/react";
import { redirect } from "next/navigation";
import React from "react";

interface PostTitleProps {
  id: number;
  title: string;
  
}

const PostTitle = ({ id, title }: PostTitleProps) => {
  const { hovered, ref } = useHover();

  return (
    <CardBody
      onClick={() => {
        redirect(`/posts/${id}`);
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
          {title}
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
          {title}
        </Text>
      )}
    </CardBody>
  );
};

export default PostTitle;
