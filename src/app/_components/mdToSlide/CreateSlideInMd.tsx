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
          <NativeSelect placeholder="default">
            <NativeOption value="gaia">gaia</NativeOption>
            <NativeOption value="uncover">uncover</NativeOption>
          </NativeSelect>
        </Button>
      </Center>
    </Flex>
  );
};

export default CreateSlideInMd;
