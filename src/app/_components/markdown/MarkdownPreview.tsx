import { testPostData } from "@/app/_testData";
import { Box } from "@yamada-ui/react";
import { marked } from "marked";
import React, { useEffect, useState } from "react";
import { Heading } from "@yamada-ui/react";
const MarkdownPreview = () => {
  const post = testPostData;
  const [md, setMd] = useState("");
  async function changeMd() {
    setMd(await marked(post.md));
  }
  useEffect(() => {
    changeMd();
  }, []);
  return (
    <Box>
      <Heading as={"h1"}>h1</Heading>
      <h1>h1</h1>
      <h2>h2</h2>
      <h3>h3</h3>
      {/* <Box as={"span"} dangerouslySetInnerHTML={{ __html: md }} /> */}
    </Box>
  );
};

export default MarkdownPreview;
