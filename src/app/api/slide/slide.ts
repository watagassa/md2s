const baseURL = process.env.NEXT_PUBLIC_API_URL + "/slide";

export const exchangeMd2s = async (
  title: string,
  md: string,
  style: number
): Promise<string> => {
  try {
    const res = await fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({
        md: md,
        title: title,
        style: style,
      }),
    });

    if (!res.ok) {
      console.error(`Failed to fetch tags: ${res.status}`);
    }
    const data: { slide: string } = await res.json();
    return data.slide;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return "";
  }
};
