"use client";
import MarkdownEditor from "@/app/_components/markdown/MarkdownEditer";
import MdSlideToggle from "@/app/_components/mdToSlide/MdSlideToggle";
import { Box, Flex, Spacer } from "@yamada-ui/react";
import React, { useState } from "react";

const NewPost = () => {
  const [isMarkdownView, setIsMarkdownView] = useState(true);
  return (
    <Box p={"md"}>
      <Flex>
        <Spacer />
        <MdSlideToggle
          isMarkdownView={isMarkdownView}
          setIsMarkdownView={setIsMarkdownView}
        />
      </Flex>
      <MarkdownEditor />
    </Box>
  );
};

export default NewPost;
