"use client";
import { createArticle } from "@/app/api/article/article";
import { createTags, getAllTags } from "@/app/api/tag/tag";
import { userSessionAtom } from "@/app/atoms/atom";
import { ArticleRequest, Tag } from "@/types/post";
import { useDisclosure } from "@yamada-ui/react";
import { useAtomValue } from "jotai";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Page from "../view/Page";
const NewPostPageLogic = () => {
  const userSession = useAtomValue(userSessionAtom);
  // loginしていなかったらloginページに遷移
  if (!userSession) {
    redirect("/login");
  }
  const [markdownValue, setMarkdownValue] = useState("");
  const [marpValue, setMarpValue] = useState("");
  const [isMarkdownView, setIsMarkdownView] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tagsWord, setTagsWord] = useState<string[]>([]);
  const [title, setTitle] = useState("");

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
    // 作られてないタグ名
    const unCreateTagsName = unMatchingTagsWord(allTags, tagsWord);
    const createdTagsName = matchingTagsWord(allTags, tagsWord);
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
      qiita_article: false,
      // dbに元からあって記事にあるタグと、dbに今登録したタグを合体
      tags: tags,
    };
    if (userSession.idToken) {
      await createArticle(userSession.idToken, ArticleData);
      redirect("/");
    }
  };

  return (
    <Page
      setTitle={setTitle}
      setTagsWord={setTagsWord}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      markdownValue={markdownValue}
      setMarkdownValue={setMarkdownValue}
      marpValue={marpValue}
      setMarpValue={setMarpValue}
      title={title}
      isMarkdownView={isMarkdownView}
      setIsMarkdownView={setIsMarkdownView}
      submitHandler={submitHandler}
    ></Page>
  );
};
export default NewPostPageLogic;
