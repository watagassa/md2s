import { Box } from "@yamada-ui/react";
import React from "react";
import { Markdown } from "@yamada-ui/markdown";

type MarkdownPreviewProps = {
  md: string;
};
// マークダウンを表示する
const MarkdownPreview = ({ md }: MarkdownPreviewProps) => {
  return (
    <Box>
      <Markdown>{md}</Markdown>
    </Box>
  );
};

export default MarkdownPreview;
