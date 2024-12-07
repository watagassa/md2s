"use client";
import { CardBody } from "@yamada-ui/react";
import { redirect } from "next/navigation";
import React from "react";

interface PostTitleProps {
  id: number;
  title: string;
}
const PostTitle = ({ id, title }: PostTitleProps) => {
  return (
    <CardBody
      onClick={() => {
        redirect(`posts/${id}`);
      }}
      fontSize="xl"
      p={"sm"}
      pl={"normal"}
    >
      {title}
    </CardBody>
  );
};

export default PostTitle;
