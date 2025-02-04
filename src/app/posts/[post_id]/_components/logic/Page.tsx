"use client";
import React, { use, useEffect, useState } from "react";
import { Article, DefaultArticle } from "@/types/post";
import { getParticularArticle } from "@/app/api/article/article";
import Page from "../view/Page";

const PostPageLogic = ({
  params,
}: {
  params: Promise<{ post_id: number }>;
}) => {
  const { post_id } = use(params); // Promiseを解決
  const [post, setPost] = useState<Article>(DefaultArticle);
  const fetchPost = async () => {
    const fetchPost = await getParticularArticle(post_id);
    if (fetchPost) {
      setPost(() => {
        return { ...fetchPost };
      });
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
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
    ></Page>
  );
};

export default PostPageLogic;
