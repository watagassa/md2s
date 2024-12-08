import { createImageURL } from "@/app/api/image/image";
import { fileToBase64 } from "./fileToBase64";

let simpleMde: EasyMDE;

const uploadImage = async (image: File) => {
  try {
    const image64 = await fileToBase64(image);

    const imageURL = await createImageURL(image64 as string);
    return imageURL;
    // 画像アップロード処理を実行
  } catch (error) {
    console.error("アップロードエラー", error);
    return "アップロードできませんでした";
  }
};

export const getEasyMDEInstance = (instance: EasyMDE) => {
  simpleMde = instance;
};
export const easyMDEHandleDrop = async (
  instance: CodeMirror.Editor,
  e: React.DragEvent
) => {
  // e.clipboardDataまたはe.dataTransferが存在するか確認
  if (
    !e.dataTransfer ||
    !e.dataTransfer.files ||
    e.dataTransfer.files.length === 0
  ) {
    return;
  }

  const files = e.dataTransfer.files;
  const file = files[0];

  if (
    file.type === "image/png" ||
    file.type === "image/jpeg" ||
    file.type === "image/gif"
  ) {
    // TODO ここにapiいれる
    const uploadedImageUrl = await uploadImage(file);
    simpleMde.codemirror.replaceSelection("![](" + uploadedImageUrl + ")");
  }
};

export const easyMDEHandlePaste = async (
  instance: CodeMirror.Editor,
  e: React.ClipboardEvent
) => {
  // e.clipboardDataが存在し、ファイルが含まれているか確認
  if (
    !e.clipboardData ||
    !e.clipboardData.files ||
    e.clipboardData.files.length === 0
  ) {
    return;
  }

  const files = e.clipboardData.files;
  const file = files[0];

  if (
    file.type === "image/png" ||
    file.type === "image/jpeg" ||
    file.type === "image/gif"
  ) {
    // TODO ここにapiいれる
    const uploadedImageUrl = await uploadImage(file);
    simpleMde.codemirror.replaceSelection("![](" + uploadedImageUrl + ")");
  }
};
