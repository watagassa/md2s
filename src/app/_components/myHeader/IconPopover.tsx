"use client";
import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@yamada-ui/react";
import React from "react";
import { useAtom } from "jotai";
import { userSessionAtom } from "@/app/atoms/atom";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

const IconPopover = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userSession, setUserSession] = useAtom(userSessionAtom);
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button borderRadius="50%" w={0}>
          <Image
            src={userSession?.image ?? undefined}
            alt={userSession?.name ?? ""}
            borderRadius="50%"
            width="10"
            // height={40}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent gap={"sm"} p={"sm"}>
        <Button
          colorScheme="info"
          onClick={() => {
            redirect("/user");
          }}
        >
          マイページ
        </Button>
        <Button colorScheme="danger" onClick={() => signOut()}>
          ログアウト
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default IconPopover;
