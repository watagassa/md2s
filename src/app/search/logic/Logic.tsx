"use client";
import { useEffect, useState } from "react";
import { Article } from "@/types/post";
import { getArticles } from "../../api/article/article";
import SearchPost from "../view";

export default function SearchPostLogic() {
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
    <SearchPost 
      posts={posts} 
      inputKeyword={inputKeyword} 
      setInputKeyword = {setInputKeyword} 
    />
  );
}
