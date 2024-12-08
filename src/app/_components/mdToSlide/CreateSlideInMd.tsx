"use client";
import { base64Encode } from "@/app/_utils/markdown_editor/ImageFnc/base64Ex";
import { exchangeMd2s } from "@/app/api/slide/slide";
import {
  Button,
  Center,
  Flex,
  Icon,
  NativeOption,
  NativeOptionGroup,
  NativeSelect,
} from "@yamada-ui/react";
import React from "react";
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
  const clickHandler = async () => {
    setMarpValue(await exchangeMd2s(title, markdownValue));
  };
  return (
    <Flex>
      <Center>
        <Button
          minW={"15rem"}
          minH={"3rem"}
          borderRadius="full" // 半楕円型の角丸設定
          // paddingX="6" // ボタンの横幅を調整
          onClick={() => {
            clickHandler();
          }}
        >
          <Icon as={PiFileMdBold} fontSize={"3xl"}></Icon>
          to
          <Icon as={BsFileEarmarkSlides} fontSize={"3xl"}></Icon>
          {/* TODO ここにmarpのレイアウトを入れる */}
          <NativeSelect placeholder="なし">
            <NativeOptionGroup label="地球人">
              <NativeOption value="孫悟空">孫悟空</NativeOption>
              <NativeOption value="孫悟飯">孫悟飯</NativeOption>
              <NativeOption value="クリリン">クリリン</NativeOption>
            </NativeOptionGroup>

            <NativeOptionGroup label="フリーザ軍">
              <NativeOption value="フリーザ">フリーザ</NativeOption>
              <NativeOption value="ギニュー">ギニュー</NativeOption>
              <NativeOption value="リクーム">リクーム</NativeOption>
              <NativeOption value="バータ">バータ</NativeOption>
              <NativeOption value="ジース">ジース</NativeOption>
              <NativeOption value="グルド">グルド</NativeOption>
            </NativeOptionGroup>
          </NativeSelect>
        </Button>
      </Center>
    </Flex>
  );
};

export default CreateSlideInMd;
