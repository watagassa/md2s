let simpleMde: EasyMDE;

const uploadImage = async () => {
  try {
    return "アップロード中";
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
    const uploadedImageUrl = await uploadImage();
    // console.log(file, fileToBase64(file));
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
    const uploadedImageUrl = await uploadImage();
    // console.log(file, fileToBase64(file));
    simpleMde.codemirror.replaceSelection("![](" + uploadedImageUrl + ")");
  }
};
