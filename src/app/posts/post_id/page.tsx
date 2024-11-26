"use client";
import React, { useState } from "react";
import MdSlideToggle from "@/app/_components/mdToSlide/MdSlideToggle";
import { Box, Flex, Spacer } from "@yamada-ui/react";
import MarkdownPreview from "@/app/_components/markdown/MarkdownPreview";
import { testPostData } from "@/app/_testData";
import SlidePreview from "@/app/_components/slide/SlidePreview";
const PostView = () => {
  // 仮置きデータ
  const post = testPostData;

  const [isMarkdownView, setIsMarkdownView] = useState(true);
  return (
    <Box p={"lg"}>
      <Flex>
        <Spacer />
        <MdSlideToggle
          isMarkdownView={isMarkdownView}
          setIsMarkdownView={setIsMarkdownView}
        />
      </Flex>
      {isMarkdownView ? (
        <Box p={"md"}>
          <MarkdownPreview md={post.md} />
        </Box>
      ) : (
        <SlidePreview slide={post.marp} />
      )}
    </Box>
  );
};

export default PostView;
