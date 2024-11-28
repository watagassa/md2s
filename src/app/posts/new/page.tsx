"use client";
import MarkdownEditor from "@/app/_components/markdown/MarkdownEditer";
import CreateSlideInMd from "@/app/_components/mdToSlide/CreateSlideInMd";
import MdSlideToggle from "@/app/_components/mdToSlide/MdSlideToggle";
import SlidePreview from "@/app/_components/slide/SlidePreview";
import { Markdown } from "@yamada-ui/markdown";
import {
  Box,
  Card,
  Flex,
  Heading,
  Input,
  ScrollArea,
  Spacer,
  VStack,
} from "@yamada-ui/react";
import React, { useState } from "react";

const NewPost = () => {
  // const userSession = useAtomValue(userSessionAtom);
  // // loginしていなかったらloginページに遷移
  // if (!userSession) {
  //   redirect("/login");
  // }
  const [markdownValue, setMarkdownValue] = useState("");
  const [marpValue, setMarpValue] = useState("");
  const [isMarkdownView, setIsMarkdownView] = useState(true);

  return (
    <Box p={"md"}>
      <Flex>
        <Box>
          <Flex pb={"xs"}>
            <Input type="text" fontSize={"4xl"} placeholder="タイトル" />
          </Flex>
          <Flex pl={"xs"}>
            <Heading fontSize={"2xl"} whiteSpace={"nowrap"} p={"xs"}>
              タグ
            </Heading>
            <Input
              type="text"
              fontSize={"xl"}
              placeholder="半角スペースで区切る"
            />
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <Flex>
            <CreateSlideInMd />
            <MdSlideToggle
              isMarkdownView={isMarkdownView}
              setIsMarkdownView={setIsMarkdownView}
            />
          </Flex>
        </Box>
      </Flex>
      {isMarkdownView ? (
        <Flex>
          <MarkdownEditor
            markdownValue={markdownValue}
            setMarkdownValue={setMarkdownValue}
          />
          <Card w={"50%"}>
            <Markdown minW={"50%"}>{markdownValue}</Markdown>
          </Card>
        </Flex>
      ) : (
        <Flex>
          <MarkdownEditor
            markdownValue={marpValue}
            setMarkdownValue={setMarpValue}
          />
          <Card w={"50%"}>
            <ScrollArea innerProps={{ as: VStack, gap: "md" }}>
              <SlidePreview slide={marpValue}></SlidePreview>
            </ScrollArea>
          </Card>
        </Flex>
      )}
    </Box>
  );
};

export default NewPost;
