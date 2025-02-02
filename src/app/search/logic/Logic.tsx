"use client";
import { useEffect, useState } from "react";
import { Article } from "@/types/post";
import { getArticles } from "../../api/article/article";
import Page from "../view";

export default function SearchPost() {
  const [posts, setPosts] = useState<Article[]>([]);
  const [inputKeyword, setInputKeyword] = useState("");

  const searchPosts = async () => {
    const p = await getArticles(5, 0);
    setPosts(p as Article[]);
  };

  useEffect(() => {
    searchPosts();
  }, []);
  
  return (
    <Page 
      posts={posts} 
      inputKeyword={inputKeyword} 
      setInputKeyword = {setInputKeyword} 
    />
  );
}
