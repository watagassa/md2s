export const fileToBase64 = (file: File) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    };
    return reader.readAsDataURL(file);
  }
};
