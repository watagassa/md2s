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

const CreateSlideInMd = () => {
  return (
    <Flex>
      <Center>
        <Button
          minW={"15rem"}
          minH={"3rem"}
          borderRadius="full" // 半楕円型の角丸設定
          // paddingX="6" // ボタンの横幅を調整
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
