import { Tag } from "@/types/post";
import { WordRequest } from "@/types/tag";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/tags";

export const getAllTags = async (): Promise<Tag[]> => {
  try {
    const res = await fetch(baseURL, {
      method: "GET",
    });

    if (!res.ok) {
      console.error(`Failed to fetch tags: ${res.status}`);
      return [] as Tag[];
    }

    const data: Tag[] = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [] as Tag[];
  }
};

export const createTags = async (
  words: WordRequest[]
): Promise<Tag[] | null> => {
  try {
    console.log("try!!:", words);

    const res = await fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(words),
    });

    if (!res.ok) {
      console.error(`Failed to create tag: ${res}`);
      return null;
    }

    const data: Tag[] = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating tag:", error);
    return null;
  }
};

export const updateTag = async (
  id: string,
  word: string
): Promise<Tag | null> => {
  try {
    const res = await fetch(`${baseURL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ word }),
    });

    if (!res.ok) {
      console.error(`Failed to update tag with ID ${id}: ${res.status}`);
      return null;
    }

    const data: Tag = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error updating tag:", error);
    return null;
  }
};
