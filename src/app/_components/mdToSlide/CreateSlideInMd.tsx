"use client";
import { exchangeMd2s } from "@/app/api/slide/slide";
import {
  Button,
  Center,
  Flex,
  Icon,
  NativeOption,
  NativeSelect,
} from "@yamada-ui/react";
import React, { useState } from "react";
import { BsFileEarmarkSlides } from "react-icons/bs";
import { PiFileMdBold } from "react-icons/pi";

interface CreateSlideInMdProps {
  markdownValue: string;
  setMarpValue: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}
const CreateSlideInMd = ({
  markdownValue,
  setMarpValue,
  title,
}: CreateSlideInMdProps) => {
  const [style, setStyle] = useState(1);
  const clickHandler = async () => {
    setMarpValue(await exchangeMd2s(title, markdownValue, style));
  };
  return (
    <Flex>
      <Center>
        {/* <Image
          alt="def"
          src={"/default.png"}
          width={"1.5rem"}
          height={"3rem"}
        ></Image>
        <Image
          alt="def-inv"
          src={"default-inv.png"}
          width={"1.5rem"}
          height={"2rem"}
        ></Image> */}
        <Button
          minW={"15rem"}
          minH={"3rem"}
          borderRadius="full" // 半楕円型の角丸設定
          // paddingX="6" // ボタンの横幅を調整
          onClick={() => {
            clickHandler();
          }}
        >
          <Icon as={PiFileMdBold} fontSize={"2xl"}></Icon>
          to
          <Icon as={BsFileEarmarkSlides} fontSize={"3xl"}></Icon>
          {/* TODO ここにmarpのレイアウトを入れる */}
          <NativeSelect
            value={style}
            onClick={(event) => event.stopPropagation()}
            onChange={(e) => setStyle(Number(e.target.value))}
          >
            <NativeOption value={0}>default</NativeOption>
            <NativeOption value={1}>default-inv</NativeOption>
            <NativeOption value={2}>gaia</NativeOption>
            <NativeOption value={3}>gaia-inv</NativeOption>
            <NativeOption value={4}>uncover</NativeOption>
            <NativeOption value={5}>uncover-inv</NativeOption>
          </NativeSelect>
        </Button>
      </Center>
    </Flex>
  );
};

export default CreateSlideInMd;
