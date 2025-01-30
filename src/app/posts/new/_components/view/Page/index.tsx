import MarkdownEditor from "@/app/_components/markdown/MarkdownEditer";
import MarkdownPreview from "@/app/_components/markdown/MarkdownPreview";
import CreateSlideInMd from "@/app/_components/mdToSlide/CreateSlideInMd";
import MdSlideToggle from "@/app/_components/mdToSlide/MdSlideToggle";
import SlidePreview from "@/app/_components/slide/SlidePreview";
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
  VStack,
  Wrap,
} from "@yamada-ui/react";
import React from "react";

interface PostProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTagsWord: React.Dispatch<React.SetStateAction<string[]>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  markdownValue: string;
  setMarkdownValue: React.Dispatch<React.SetStateAction<string>>;
  marpValue: string;
  setMarpValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  isMarkdownView: boolean;
  setIsMarkdownView: React.Dispatch<React.SetStateAction<boolean>>;
  submitHandler: (isPublic: boolean) => Promise<void>;
}
const Page = ({
  setTitle,
  setTagsWord,
  isOpen,
  onOpen,
  onClose,
  markdownValue,
  setMarkdownValue,
  marpValue,
  setMarpValue,
  title,
  isMarkdownView,
  setIsMarkdownView,
  submitHandler,
}: PostProps) => {
  return (
    <Box p={"normal"}>
      {/* タイトルとタグ */}
      <HStack>
        <Box marginBottom={"sm"} w={"50%"}>
          <Flex pb={"sm"}>
            <Input
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
export default Page;
