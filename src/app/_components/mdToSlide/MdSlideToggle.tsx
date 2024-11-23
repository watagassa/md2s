"use client";
import { Button, Center, Flex, Icon } from "@yamada-ui/react";
import React, { useState } from "react";
import { BsFileEarmarkSlides } from "react-icons/bs";
import { PiFileMdBold } from "react-icons/pi";
const MdSlideToggle = () => {
  // TODO これは親コンポーネントから受け取れるようにする
  const [isMarkdownView, setIsMarkdownView] = useState(true);

  return (
    <Flex>
      <Center>
        <Button
          onClick={() => {
            if (!isMarkdownView) {
              setIsMarkdownView(true);
            }
          }}
          w={"3.5rem"}
          bg={isMarkdownView ? "neutral.500" : "white"}
          color={isMarkdownView ? "white" : "neutral.500"}
          _hover={{ bg: isMarkdownView ? "neutral.600" : "neutral.300" }}
          borderRadius="full" // 半楕円型の角丸設定
          borderRightRadius="0" // 左側のボタンは右端を直線にする
          // paddingX="6" // ボタンの横幅を調整
        >
          <Icon as={PiFileMdBold} fontSize={"3xl"}></Icon>
        </Button>
      </Center>

      <Button
        onClick={() => {
          if (isMarkdownView) {
            setIsMarkdownView(false);
          }
        }}
        w={"3.5rem"}
        bg={!isMarkdownView ? "neutral.500" : "white"}
        color={!isMarkdownView ? "white" : "neutral.500"}
        _hover={{ bg: !isMarkdownView ? "neutral.600" : "neutral.300" }}
        borderRadius="full" // 半楕円型の角丸設定
        borderLeftRadius="0" // 右側のボタンは左端を直線にする
      >
        <Icon as={BsFileEarmarkSlides} fontSize={"3xl"}></Icon>
      </Button>
    </Flex>
  );
};

export default MdSlideToggle;
