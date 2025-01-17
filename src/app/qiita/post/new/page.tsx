"use client";
import MarkdownEditor from "@/app/_components/markdown/MarkdownEditer";
import MarkdownPreview from "@/app/_components/markdown/MarkdownPreview";
import CreateSlideInMd from "@/app/_components/mdToSlide/CreateSlideInMd";
import MdSlideToggle from "@/app/_components/mdToSlide/MdSlideToggle";
import SlidePreview from "@/app/_components/slide/SlidePreview";
import { createArticle } from "@/app/api/article/article";
import { createTags, getAllTags } from "@/app/api/tag/tag";
import { qiitaPostAtom, userSessionAtom } from "@/app/atoms/atom";
import { ArticleRequest, Tag } from "@/types/post";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ScrollArea,
  Spacer,
  useDisclosure,
  VStack,
  Wrap,
} from "@yamada-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
const NewPostData = () => {
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
      post.tags.map((e) => {
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
    <Box p={"normal"}>
      {/* タイトルとタグ */}
      <HStack>
        <Box marginBottom={"sm"} w={"50%"}>
          <Flex pb={"sm"}>
            <Input
              value={title}
              type="text"
              fontSize={"4xl"}
              width={"3xl"}
              bgColor={"neutral.50"}
              placeholder="タイトルを入力してください。"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Flex>
          <Flex>
            <Input
              value={tagSpacer(tagsWord)}
              type="text"
              fontSize={"xl"}
              bgColor={"neutral.50"}
              placeholder="タグを入力してください。半角スペースで区切る"
              onChange={(e) => {
                const words = e.target.value.split(" ").filter((elem) => {
                  return elem !== "";
                }) as string[];
                setTagsWord(words);
              }}
            />
          </Flex>
        </Box>
        {/* qiitaの記事インポート */}
        <Spacer />
        <Box>
          <VStack>
            <Button
              colorScheme={"success"}
              onClick={() => {
                onOpen();
              }}
              mb={"sm"}
              w={"200px"}
              ml={"30px"}
            >
              qiitaの記事をimport
            </Button>
            {/* ボタンを押したら出てくる */}
            <Modal open={isOpen} onClose={onClose}>
              <Center>
                <ModalHeader>注意</ModalHeader>
              </Center>

              <ModalBody>
                <Center>qiitaの記事をimportすると</Center>
                <Center>現在のmarkdownを上書きしてしまいます</Center>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => {
                    onClose();
                  }}
                >
                  cancel
                </Button>
                <Button colorScheme="primary">importする!!</Button>
              </ModalFooter>
            </Modal>
          </VStack>
          {/* markdownからslideにする */}
          <Wrap gap={"md"} marginInline={"normal"} pb={"sm"}>
            <CreateSlideInMd
              setMarpValue={setMarpValue}
              markdownValue={markdownValue}
              title={title}
            />
            <MdSlideToggle
              isMarkdownView={isMarkdownView}
              setIsMarkdownView={setIsMarkdownView}
            />
          </Wrap>
        </Box>
      </HStack>
      {isMarkdownView ? (
        <Flex>
          <MarkdownEditor
            markdownValue={markdownValue}
            setMarkdownValue={setMarkdownValue}
          />
          <ScrollArea h={"63vh"} w={"50%"}>
            <Card
              bgColor={"whiteAlpha.950"}
              border={"1px solid #CED4DA"}
              boxShadow={"0"}
              minH={"full"}
            >
              <MarkdownPreview md={markdownValue}></MarkdownPreview>
              {/* <Markdown p={"md"}>{markdownValue}</Markdown> */}
            </Card>
          </ScrollArea>
        </Flex>
      ) : (
        <Flex>
          <MarkdownEditor
            markdownValue={marpValue}
            setMarkdownValue={setMarpValue}
          />
          <ScrollArea h={"lg"} w={"50%"}>
            <Card
              bgColor={"#CED4DA"}
              border={"1px solid #CED4DA"}
              boxShadow={"0"}
            >
              <SlidePreview slide={marpValue}></SlidePreview>
            </Card>
          </ScrollArea>
        </Flex>
      )}
      {/* 下書き保存,投稿ボタン */}
      <Center
        h={"15"}
        w={"50%"}
        position={"fixed"}
        borderBlock={"black"}
        boxShadow="0px 0px 1px black"
        right={"0"}
        bottom={"0"}
        bgColor={"white"}
      >
        <Spacer />
        <Flex gapX={"md"} p="lg">
          <Button
            type="submit"
            onClick={() => {
              submitHandler(false);
            }}
          >
            下書き保存
          </Button>
          {/* テスト用にこちらだけsubmitじゃない */}
          <Button
            colorScheme={"info"}
            type="submit"
            onClick={() => {
              submitHandler(true);
            }}
          >
            公開投稿
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};
export default NewPostData;
