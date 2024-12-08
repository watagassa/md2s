const baseURL = process.env.NEXT_PUBLIC_API_URL + "/imgs";
export const createImageURL = async (image: string): Promise<string | null> => {
  try {
    const now = new Date().toISOString();
    console.log(now);
    const res = await fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({
        name: now,
        data: image,
      }),
    });

    if (!res.ok) {
      console.error(`Failed to create tag: ${res}`);
      return null;
    }

    const data: string = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating tag:", error);
    return null;
  }
};
