"use client";
import { getParticularArticle, updateArticle } from "@/app/api/article/article";
import { createTags, getAllTags } from "@/app/api/tag/tag";
import { userSessionAtom } from "@/app/atoms/atom";
import { Article, ArticleRequest, DefaultArticle, Tag } from "@/types/post";
import { useDisclosure } from "@yamada-ui/react";
import { useAtomValue } from "jotai";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import Page from "../view/Page";
interface EditPageLogicProps {
  post_id: number;
}
const EditPageLogic = ({ post_id }: EditPageLogicProps) => {
  const userSession = useAtomValue(userSessionAtom);
  // // loginしていなかったらloginページに遷移
  // // userページにボタン追加したらつける
  // // if (!userSession) {
  // //   redirect("/login");
  // // }
  const [post, setPost] = useState<Article>(DefaultArticle);
  // // 非同期関数を useEffect 内で呼び出す
  useEffect(() => {
    const fetchPost = () => {
      getParticularArticle(post_id)
        .then((fetchedPost) => {
          if (fetchedPost) {
            setPost(fetchedPost);
          }
        })
        .catch((error) => {
          console.error("記事の取得中にエラーが発生しました:", error);
        });
    };

    fetchPost(); // 非同期関数を呼び出す
  }, [post_id]);
  const [markdownValue, setMarkdownValue] = useState("");
  const [marpValue, setMarpValue] = useState("");
  const [isMarkdownView, setIsMarkdownView] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tagsWord, setTagsWord] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (post.create_user_id !== "") {
      setMarkdownValue(post.main_MD);
      setMarpValue(post.slide_MD);
      setTagsWord(
        post.tags.map((e) => {
          return e.word;
        })
      );
      setTitle(post.title);
    }
  }, [post]);
  const [tagsWordSpace, setTagsWordSpace] = useState("");

  useEffect(() => {
    let a = "";
    tagsWord.map((e) => {
      a += e + " ";
    });

    setTagsWordSpace(a.slice(0, -1));
  }, [tagsWord]);
  // dbに登録されているtagに、新しい記事のtagがあるかを判別する
  const unMatchingTagsWord = (allTags: Tag[], tagsName: string[]) => {
    const matchName = tagsName.filter((name) => {
      return (
        undefined ==
        allTags.find((aTag) => {
          return name == aTag.word;
        })
      );
    });
    return matchName;
  };
  const matchingTagsWord = (allTags: Tag[], tagsWord: string[]) => {
    return allTags.filter((tag) => {
      return tagsWord.find((word) => {
        return tag.word == word;
      });
    });
  };
  const submitHandler = async (isPublic: boolean) => {
    const allTags = await getAllTags();
    const words = tagsWordSpace.split(" ").filter((elem) => {
      return elem !== "";
    }) as string[];
    // 作られてないタグ名
    const unCreateTagsName = unMatchingTagsWord(allTags, words);
    const createdTagsName = matchingTagsWord(allTags, words);
    let tags: Tag[] = createdTagsName;

    if (unCreateTagsName.length !== 0) {
      const unCrWords = unCreateTagsName.map((name) => {
        return {
          word: name,
        };
      });
      const crTags = await createTags(unCrWords);
      if (crTags) {
        tags = [...tags, ...crTags];
      }
    }
    const ArticleData: ArticleRequest = {
      // TODO user_idを取得してくる
      title: title,
      main_MD: markdownValue,
      slide_MD: marpValue,
      public: isPublic,
      // // TODO qiitaから取ってきたときにtrueにするから、後で消す
      qiita_article: post.qiita_article,
      // dbに元からあって記事にあるタグと、dbに今登録したタグを合体
      tags: tags,
    };
    if (userSession?.idToken) {
      await updateArticle(userSession.idToken, post_id, ArticleData);
      redirect("/");
    }
  };
  return (
    <Page
      setTitle={setTitle}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      markdownValue={markdownValue}
      setMarkdownValue={setMarkdownValue}
      marpValue={marpValue}
      setMarpValue={setMarpValue}
      title={title}
      tagsWordSpace={tagsWordSpace}
      setTagsWordSpace={setTagsWordSpace}
      isMarkdownView={isMarkdownView}
      setIsMarkdownView={setIsMarkdownView}
      submitHandler={submitHandler}
    ></Page>
  );
};
export default EditPageLogic;
