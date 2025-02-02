"use client";
import { use, useEffect, useState } from "react";
import { Article } from "@/types/post";
import { searchArticles } from "@/app/api/article/article";
import SearchPostKeyword from "../view";

export default function SearchPostKeywordLogic({
  params,
}: {
  params: Promise<{ keyword: string }>;
}) {
  const { keyword } = use(params); // Promiseを解決
  const [posts, setPosts] = useState<Article[]>([]);
  const [inputKeyword, setInputKeyword] = useState(decodeURIComponent(keyword));

  const searchPosts = async () => {
    setPosts(await searchArticles(inputKeyword));
  };

  useEffect(() => {
    searchPosts();
  }, []);
  
  return (
    <SearchPostKeyword
      posts = {posts}
      inputKeyword = {inputKeyword}
      setInputKeyword = {setInputKeyword}
    />
  );
}
