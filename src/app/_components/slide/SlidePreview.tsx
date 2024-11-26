import React from "react";
import { Box } from "@yamada-ui/react";
import MarpSlide from "./MarpSlide";

type SlidePreviewProps = {
  slide: string; // Marp形式の文字列
};

const SlidePreview = ({ slide }: SlidePreviewProps) => {
  return (
    <Box>
      {/* スライドのCSSをスタイルタグとして適用 */}
      <MarpSlide markdown={slide}></MarpSlide>
    </Box>
  );
};

export default SlidePreview;
