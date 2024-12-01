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
    <Box p={"normal"}>
      <Flex>
        <Box marginBottom={"sm"}>
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
          <Flex gap={"md"} marginTop={"xl"} marginInline={"normal"}>
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
          <Card
            w={"50%"}
            bgColor={"whiteAlpha.950"}
            border={"1px solid #CED4DA"}
            boxShadow={"0"}
          >
            <Markdown minW={"50%"} p={"md"}>
              {markdownValue}
            </Markdown>
          </Card>
        </Flex>
      ) : (
        <Flex>
          <MarkdownEditor
            markdownValue={marpValue}
            setMarkdownValue={setMarpValue}
          />
          <Card
            w={"50%"}
            bgColor={"#CED4DA"}
            border={"1px solid #CED4DA"}
            boxShadow={"0"}
          >
            <ScrollArea innerProps={{ as: VStack, gap: "1px" }}>
              <SlidePreview slide={marpValue}></SlidePreview>
            </ScrollArea>
          </Card>
        </Flex>
      )}
    </Box>
  );
};

export default NewPost;
