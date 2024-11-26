// components/MarpSlide.tsx
import React from "react";
import { Marp } from "@marp-team/marp-core";

type MarpSlideProps = {
  markdown: string;
};

const MarpSlide: React.FC<MarpSlideProps> = ({ markdown }) => {
  const marp = new Marp();
  const { html, css } = marp.render(markdown);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default MarpSlide;
