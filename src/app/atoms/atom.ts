import { Article, DefaultArticle } from "@/types/post";
import { User } from "@/types/user";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

type SessionType = {
  idToken?: string;
  name?: string | null | undefined;
  image?: string | null | undefined;
};
// ユーザー情報を保持するatom
export const userSessionAtom = atom<SessionType | null>(null);

// ユーザーのログイン情報を保持するatom
export const userAtom = atom<User | null>(null);
export const userAtomLoadable = loadable(userAtom);

export const qiitaPostAtom = atom<Article>(DefaultArticle);
