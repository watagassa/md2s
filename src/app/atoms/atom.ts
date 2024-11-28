import { User } from "@/types/post";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

type SessionType = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};
// ユーザー情報を保持するatom
export const userAtom = atom<User | null>(null);
export const userAtomLoadable = loadable(userAtom);
export const userSessionAtom = atom<SessionType | null>(null);
