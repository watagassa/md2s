"use client";
import React from "react";
import MdSlideToggle from "@/app/_components/mdToSlide/MdSlideToggle";
import { Box } from "@yamada-ui/react";
import MarkdownPreview from "@/app/_components/markdown/MarkdownPreview";
const page = () => {
  // const post = testPostData;
  return (
    <Box>
      <div>post_idページ</div>
      <MdSlideToggle></MdSlideToggle>
      <Box>
        <MarkdownPreview></MarkdownPreview>
      </Box>
    </Box>
  );
};

export default page;
