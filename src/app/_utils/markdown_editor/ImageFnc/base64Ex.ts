// Base64エンコード（string型引数）
export function base64Encode(text: string): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    // stringをUint8Arrayに変換
    const uint8Array = new TextEncoder().encode(text);
    // Uint8ArrayをBlobに変換
    const blob = new Blob([uint8Array]);

    reader.onload = () => {
      const result = reader.result as string;
      const offset = result.indexOf(",") + 1; // "data:"の後の部分だけ取り出す
      resolve(result.slice(offset)); // Base64部分だけを返す
    };

    reader.readAsDataURL(blob); // Blobとして読み込む
  });
}
export const base64Decode = (text: string) => {
  const buffer = Buffer.from(text);
  // BufferからBase64エンコードされた文字列を取得
  const base64EncodedString = buffer.toString("base64");

  // Base64エンコードされた文字列をBufferに変換
  const bufferFromBase64 = Buffer.from(base64EncodedString, "base64");

  // Bufferからデコードされた文字列を取得
  return bufferFromBase64.toString();
};
// // Base64デコード（文字列）
// export async function base64Decode(
//   text: string,
//   charset: string = "UTF-8"
// ): Promise<string> {
//   return fetch(`data:text/plain;charset=${charset};base64,` + text)
//     .then((response) => response.text())
//     .catch((error) => {
//       console.error("Decoding error:", error);
//       throw new Error("Invalid Base64 data or charset");
//     });
// }
