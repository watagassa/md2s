import React from "react";
import { Box } from "@yamada-ui/react";
import { Markdown } from "@yamada-ui/markdown";

// 不正なタグを除去する関数
// 必要なタグも除去する可能性が存在する
const sanitizeMarkdown = (markdown: string): string => {
  const invalidTagRegex = /<\/?[a-zA-Z0-9]+[^>]*>/g;
  return markdown.replace(invalidTagRegex, (tag) => {
    const allowedTags = ["h1", "h2", "p", "strong", "em", "ul", "li"];
    const tagName = tag.match(/<\/?([a-zA-Z0-9]+)/)?.[1];
    return allowedTags.includes(tagName || "") ? tag : "";
  });
};

type MarkdownPreviewProps = {
  md: string;
};

const MarkdownPreview = ({ md }: MarkdownPreviewProps) => {
  const sanitizedMd = sanitizeMarkdown(md);

  return (
    <Box>
      <Markdown>{sanitizedMd}</Markdown>
    </Box>
  );
};

export default MarkdownPreview;
