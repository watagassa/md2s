"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMde = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type MarkdownEditorSchema = {
  markdownValue: string;
  setMarkdownValue: React.Dispatch<React.SetStateAction<string>>;
};
export const MarkdownEditor = ({
  markdownValue,
  setMarkdownValue,
}: MarkdownEditorSchema) => {
  const onChange = (value: string) => {
    setMarkdownValue(value);
  };
  // useMemoを使用しないと、markdownValueが変わるたびに
  // optionが生成され、再レンダリングが起きる by ChatGPT
  const editorOptions: EasyMDE.Options = useMemo(() => {
    return {
      maxHeight: "50vh",
      lineNumbers: true, // 行番号を表示
      toolbar: [
        "bold", // 太字
        "italic", // 斜体
        "strikethrough", // 取り消し線
        "|", // 区切り線
        // "heading", // 見出し
        // "heading-smaller", // 小さい見出し
        // "heading-bigger", // 大きい見出し
        // "|",
        "quote", // 引用
        "unordered-list", // 箇条書きリスト
        "ordered-list", // 番号付きリスト
        "code", // コード挿入
        "table", // テーブル
        "|",
        "link", // リンク挿入
        "image", // 画像挿入
        // "horizontal-rule", // 水平線
        "|",
        "undo", // 元に戻す
        "redo", // やり直す
        "|",
        // "preview", // プレビュー表示
        // "side-by-side", // エディター＆プレビュー表示
        // "fullscreen", // フルスクリーン
        // "|",
        // "clean-block", // フォーマット解除
        "guide", // Markdownガイド
      ],
    };
  }, []); // オプションが固定であれば空配列でOK
  return (
    <SimpleMde
      value={markdownValue}
      onChange={onChange}
      style={{ width: "50%" }}
      options={editorOptions}
    />
  );
};

export default MarkdownEditor;
