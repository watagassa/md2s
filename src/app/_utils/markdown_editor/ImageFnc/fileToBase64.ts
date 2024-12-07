export const fileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image64File = reader.result as string;
      const image64 = image64File.split(",")[1];
      resolve(image64); // Base64エンコードされたデータ
    };
    reader.onerror = (error) => {
      reject(error); // エラー処理
    };
    reader.readAsDataURL(file);
  });
};
