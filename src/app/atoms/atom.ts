import { atom } from "jotai";

type SessionType = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};
// ユーザー情報を保持するatom
export const userSessionAtom = atom<SessionType | null>(null);
