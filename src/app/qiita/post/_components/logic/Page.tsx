"use client";
import React, { useState } from "react";
import { qiitaPostAtom } from "@/app/atoms/atom";
import { useAtom } from "jotai";
import Page from "../view/Page";

const QiitaPostPageLogic = () => {
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
    <Page
      post={post}
      createdDateStr={createdDateStr}
      updatedDateStr={updatedDateStr}
      isMarkdownView={isMarkdownView}
      setIsMarkdownView={setIsMarkdownView}
    />
  );
};

export default QiitaPostPageLogic;
