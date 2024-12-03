"use client";
import MarkdownEditor from "@/app/_components/markdown/MarkdownEditer";
import CreateSlideInMd from "@/app/_components/mdToSlide/CreateSlideInMd";
import MdSlideToggle from "@/app/_components/mdToSlide/MdSlideToggle";
import SlidePreview from "@/app/_components/slide/SlidePreview";
import { userSessionAtom } from "@/app/atoms/atom";
import { Markdown } from "@yamada-ui/markdown";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Input,
  ScrollArea,
  Spacer,
  Wrap,
} from "@yamada-ui/react";
import { useAtomValue } from "jotai";
import { redirect } from "next/navigation";
import React, { useState } from "react";
const NewPost = () => {
  const userSession = useAtomValue(userSessionAtom);
  // loginしていなかったらloginページに遷移
  if (!userSession) {
    redirect("/login");
  }
  const [markdownValue, setMarkdownValue] = useState("");
  const [marpValue, setMarpValue] = useState("");
  const [isMarkdownView, setIsMarkdownView] = useState(true);

  return (
    <Box p={"normal"}>
      <Flex>
        <Box marginBottom={"sm"} w={"50%"}>
          <Flex pb={"sm"}>
            <Input
              type="text"
              fontSize={"4xl"}
              width={"3xl"}
              bgColor={"neutral.50"}
              placeholder="タイトルを入力してください。"
            />
          </Flex>
          <Flex>
            <Input
              type="text"
              fontSize={"xl"}
              bgColor={"neutral.50"}
              placeholder="タグを入力してください。半角スペースで区切る"
            />
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <Wrap gap={"md"} marginTop={"xl"} marginInline={"normal"}>
            <CreateSlideInMd />
            <MdSlideToggle
              isMarkdownView={isMarkdownView}
              setIsMarkdownView={setIsMarkdownView}
            />
          </Wrap>
        </Box>
      </Flex>
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
              <Markdown p={"md"}>{markdownValue}</Markdown>
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
          <Button type="submit">下書き保存</Button>
          <Button colorScheme={"info"} type="submit">
            公開投稿
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};

export default NewPost;
