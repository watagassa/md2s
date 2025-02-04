"use client";
import { createArticle } from "@/app/api/article/article";
import { createTags, getAllTags } from "@/app/api/tag/tag";
import { qiitaPostAtom, userSessionAtom } from "@/app/atoms/atom";
import { ArticleRequest, Tag } from "@/types/post";
import { useDisclosure } from "@yamada-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import Page from "../view/Page";
const NewPostDataLogic = () => {
  const userSession = useAtomValue(userSessionAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [post, setPost] = useAtom(qiitaPostAtom);
  const [markdownValue, setMarkdownValue] = useState("");
  const [marpValue, setMarpValue] = useState("");
  const [isMarkdownView, setIsMarkdownView] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tagsWord, setTagsWord] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  // loginしていなかったらloginページに遷移
  if (!userSession) {
    redirect("/login");
  }
  useEffect(() => {
    setMarkdownValue(post.main_MD);
    setMarpValue(post.slide_MD);
    setTagsWord(
      post.tags?.map((e) => {
        return e.word + " ";
      })
    );
    setTitle(post.title);
  }, [post]);

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
  const tagSpacer = (tagsWord: string[]) => {
    let text = "";
    tagsWord.map((e) => {
      text = text + e + " ";
    });
    const result = text.slice(0, -1);
    return result;
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
      // // TODO qiitaから取ってきたときにtrueにする
      qiita_article: true,
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
      tagSpacer={tagSpacer}
      tagsWord={tagsWord}
    ></Page>
  );
};
export default NewPostDataLogic;
